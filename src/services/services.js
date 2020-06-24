const _apiBaza = "https://www.nbrb.by/api/exrates";

class Service {
  getAllCurrencies = async () => {
    const result = await fetch(`${_apiBaza}/rates?periodicity=0`);
    if (!result.ok) {
      throw new Error(`Could not fetch periodicity, received ${result.status}`);
    }
    return await result.json();
  };
}

export default Service;
