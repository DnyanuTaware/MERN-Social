import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataURL = (file) => {
  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString();
  //console.log(extName)//must not include .  => replace(".","")
  return parser.format(extName, file.buffer);
};

export default getDataURL;
