import { google } from 'googleapis'
import * as prettier from 'prettier'
import * as dotenv from 'dotenv'

import { writeFile } from './utils';

dotenv.config()
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID,
} = process.env;

const sheetsService = google.sheets({ version: "v4", auth: GOOGLE_SHEETS_API_KEY })

sheetsService.spreadsheets.values.get({
  spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
  range: 'B3:D400',
  valueRenderOption: 'UNFORMATTED_VALUE',
}, async (err, result) => {
  if (err || !result?.data.values) {
    // Handle error
    console.log(err);
  } else {
    writeFile(
      'src/_data',
      'bookings.js',
      await prettier.format(
        `module.exports = ${JSON.stringify(result.data.values)}`,
        {
          parser: 'babel',
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
        }
      )
    )
  }
});