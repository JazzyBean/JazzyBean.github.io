///////VISUALIZATION//////
function diagram()
{
  country = ["Rwanda", "El Salvador", "Cuba", "Tanzania", "Uganda", "Cameroon", "Honduras", "Nicaragua", "Brazil", "Guatemala"]
  values = [39.16, 17.08, 16.96, 14.60, 14.07, 13.54, 13.18, 12.85, 12.80, 12.55]

  for (let i = 0; i < country.length; i++) {
    document.getElementById(country[i]).setAttribute("height", values[i] * 10); 
    document.getElementById(country[i]).setAttribute("y", 450-(values[i] * 10)); 
  }
}

///////DRAWING//////
function beanInteraction(){
  document.getElementById("text-box").style.fill = "#FFB800";
  document.getElementById("triangle").style.fill = "#FFB800";
  document.getElementById("text").style.fill = "#491F47";
}
