
/**
* filters deleted vendor from ventors using deleted vendors Id
*
* @param {array} vendors 
* @param {string} vendorId
*
* @returns {array} -  vendors
*/
const filterDeletedVendor = (vendors, vendorId) => (
  vendors.filter(vendor => vendor.id !== vendorId)
);

export default filterDeletedVendor;
