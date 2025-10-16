async function fetchData(){
    const data = await d3.csv("./videogames_wide.csv");
    return data;
}

fetchData().then(async (data) => {
    const vlSpec = vl 
    .markBar()
    .data(data)
    .encode(
        vl.x().fieldQ("Global_Sales").aggregate("count").title('Total Global Sales (millions)'),
        vl.y().fieldN("Platform"),
        vl.color().fieldN("Genre")
  )
  .width("container")
  .height(400)
  .title('Global Sales by Platform and Genre')
  .toSpec();

  const vlSpec2 = vl
    .markSquare()
    .data(data)
    .encode(
        vl.x().field('Year').title('Year'),
        vl.y().sum('Global_Sales').title('Total Global Sales (millions)'),
        vl.color().fieldN('Genre').title('Genre'),
        vl.detail().fieldN('Platform'),
  )
  .width("container")
  .height(400)
  .title('Sales Over Time by Platform and Genre')
  .toSpec()

  const vlSpec3 = vl 
    .markBar()
    .data(data)
    .transform(
        vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'])
        .as(['Region', 'Sales'])
  )
    .encode(
        vl.x().fieldN('Platform').title('Platform'),
        vl.y().sum('Sales').title('Total Sales (millions)'),
        vl.color().fieldN('Region').title('Regions'),
        vl.tooltip(['Platform', 'Region', 'Sales'])
  )
  .width("container")
  .height(400)
  .title('Regional Sales by Platform')
  .toSpec()

  const vlSpec4 = vl
    .markBar()
    .data(data)
    .encode(
        vl.y().fieldQ("JP_Sales").aggregate("count").title('Total Sales (millions)'),
        vl.x().fieldQ("Year"),
  )
  .width("container")
  .height(400)
  .title('Sales in Japan over time')
  .toSpec()

  vegaEmbed("view", vlSpec);
  vegaEmbed("view2", vlSpec2);
  vegaEmbed("view3", vlSpec3);
  vegaEmbed("view4", vlSpec4);

});


// async function render(viewID, spec) {
//   const result = await vegaEmbed(viewID, spec);
//   result.view.run();
// }

async function render(viewID, spec) {
  const result = await vegaEmbed(`#${viewID}`, spec);
  result.view.run();
}
