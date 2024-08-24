import fs = require('fs');
import path = require('path');

export default function logError(error: unknown) {
  const errors = error as unknown as Error;
  const cwd = process.cwd();
  const logFileDirectory = path.join(cwd + '/public/logs');

  if (!fs.existsSync(logFileDirectory)) {
    fs.mkdirSync(logFileDirectory);
  }

  const fileName = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.txt`;
  const logFilePath = logFileDirectory + '/' + fileName;

  const fileExist = fs.existsSync(logFilePath);
  if (fileExist) {
    fs.appendFileSync(
      logFilePath,
      `\n ${errors?.message} \n ${errors?.stack} \n`
    );
  } else {
    fs.writeFileSync(
      logFilePath,
      `\n ${errors?.message} \n ${errors?.stack} \n`
    );
  }
  return errors;
}
