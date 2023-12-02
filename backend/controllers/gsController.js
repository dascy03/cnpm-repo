import {generalSetting} from "../models/GeneralSetting.js";

export const displayGeneralSetting = async (req, res) => {
  res.json(generalSetting());
};

export const displayDefaulttPage = async (req, res) => {
  res.json(generalSetting().defaulttPage);
};

export const displayMaxFileSize = async (req, res) => {
  res.json(generalSetting().maxFileSize);
};

export const displayFileType = async (req, res) => {
  res.json(generalSetting().fileType);
};

export const displayMaxPrintPage = async (req, res) => {
  res.json(generalSetting().maxPrintPage);
};

export const displayPageSize = async (req, res) => {
  res.json(generalSetting().pageSize);
};

export const displayPageSide = async (req, res) => {
  res.json(generalSetting().pageSide);
};

export const displayPrintingInk = async (req, res) => {
  res.json(generalSetting().printingInk);
};


export const displayCheckOut = async (req, res) => {
  res.json(generalSetting().checkOut);
};

export const displayMaxBuyPage = async (req, res) => {
  res.json(generalSetting().maxBuyPage);
};



