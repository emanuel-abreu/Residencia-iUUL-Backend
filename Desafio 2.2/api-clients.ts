import fetch from "node-fetch";

interface Converter {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  date: string;
  result: number;
}

class GenericApiClient<T> {
  async fetchApi(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      const error = (await response.json()) as { error: unknown };
      throw new Error(`Erro na comunicação com a API: ${error.error}`);
    }
    const data = (await response.json()) as T;
    return data;
  }
}

class ExchangeRate extends GenericApiClient<Converter> {
  async fetchExchangeRate(
    from: string,
    to: string,
    amount: number
  ): Promise<Converter> {
    const urlApi: string = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    try {
      return await this.fetchApi(urlApi);
    } catch (error) {
      throw new Error(`Erro na comunicação com a API: ${error}`);
    }
  }
}

export default ExchangeRate;
