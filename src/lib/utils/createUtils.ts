export function createDate() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ('0' + (now.getMonth() + 1)).slice(-2); 
  const day = ('0' + now.getDate()).slice(-2); 
  const YYMMDD = year + month + day;
  return YYMMDD;
}