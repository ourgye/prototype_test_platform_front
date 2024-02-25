// class로 만들 수 없나?
import { getCountryDataList } from "countries-list";

export function getCountryList() {
  const countryNativeList = getCountryDataList().map((_, i) => {
    return _.native;
  });

  return countryNativeList;
}
