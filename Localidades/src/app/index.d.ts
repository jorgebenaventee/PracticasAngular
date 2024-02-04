type Common = {
  parent_code: string;
  label: string;
  code: string;
}

export type Community = Common & {
  provinces: Province[];
}

export type Province = Common & {
  towns: Common[];
}

type Town = Common
