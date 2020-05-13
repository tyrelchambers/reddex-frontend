export default title => {
  const str = title.length < 70 ? title : title.slice(0,70) + "...";
  return str; 
}