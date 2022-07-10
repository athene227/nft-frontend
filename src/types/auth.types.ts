export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface JwtDecoded {
  payload: {
    _id: string;
    publicAddress: string;
  };
  exp: number;
}
