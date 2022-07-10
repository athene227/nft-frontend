import jwtDecode from 'jwt-decode';
import { IToken, JwtDecoded } from 'src/types/auth.types';

const LS_KEY = 'login-with-metamask:auth';
const LS_CURRENT = 'login-with-metamask:auth-current';

class TokenService {
  getCurrentToken() {
    const strCurrent = localStorage.getItem(LS_CURRENT);
    try {
      if (strCurrent) {
        return JSON.parse(strCurrent);
      }
      return {};
    } catch (err) {
      return {};
    }
  }

  setCurrentToken(token: IToken) {
    localStorage.setItem(LS_CURRENT, JSON.stringify(token));
  }

  removeCurrentToken(deleteFromList = true) {
    const currentToken = this.getCurrentToken();
    if (currentToken.accessToken && deleteFromList) {
      const tokens = this.getTokens();
      const newTokens = tokens.filter((token) => {
        return token.accessToken !== currentToken.accessToken;
      });
      this.updateTokens(newTokens);
    }
    localStorage.removeItem(LS_CURRENT);
  }

  getTokens(): IToken[] {
    const sTokenList = localStorage.getItem(LS_KEY);

    try {
      if (!sTokenList) {
        return [];
      }
      return JSON.parse(sTokenList);
    } catch (err) {
      return [];
    }
  }

  removeTokens() {
    localStorage.removeItem(LS_KEY);
  }

  private updateTokens(tokenList: IToken[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(tokenList));
  }

  addToken(token: IToken) {
    const tokensList = this.getTokens();
    const updatedTokenList = [...tokensList];

    updatedTokenList.push(token);
    this.updateTokens(updatedTokenList);
  }

  removeInvalidTokens() {
    const tokens: IToken[] = this.getTokens();
    if (!tokens?.length) {
      return;
    }

    for (let i = 0; i < tokens.length; ) {
      try {
        const {
          payload: { _id, publicAddress },
          exp
        } = jwtDecode<JwtDecoded>(tokens[i].accessToken);

        // Check if token is expired or not having _id, publicAddress
        if (!exp || !_id || !publicAddress) {
          tokens.splice(i, 1);
        } else {
          i++;
        }
      } catch {
        tokens.splice(i, 1);
      }
    }

    this.updateTokens(tokens);
  }

  getTokenByAddress(account: string): IToken | undefined {
    const tokensFromStorage = this.getTokens();
    const token = tokensFromStorage.find(({ accessToken }) => {
      try {
        const {
          payload: { publicAddress }
        } = jwtDecode<JwtDecoded>(accessToken);

        return publicAddress.toLowerCase() === account;
      } catch (err) {
        return false;
      }
    });

    return token;
  }

  updateAccessToken(updatedToken: IToken) {
    const tokens = this.getTokens();
    const newTokens = tokens.map((token) => {
      if (token.refreshToken === updatedToken.refreshToken) {
        return updatedToken;
      }
      return token;
    });

    this.updateTokens(newTokens);
  }
}
export default Object.freeze(new TokenService());
