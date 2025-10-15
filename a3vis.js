async function fetchData(){
    const data = await d3.csv("/videogames_wide.csv");
    return data;
}

fetchData().then(async (data) => {
    const vlSpec = vl 
    .markBar()
    .data(videoGamesData)
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
    .data(videoGamesData)
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
    .data(videoGamesData)
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
    .data(videoGamesData)
    .encode(
        vl.y().fieldQ("JP_Sales").aggregate("count").title('Total Sales (millions)'),
        vl.x().fieldQ("Year"),
  )
  .width("container")
  .height(400)
  .title('Sales in Japan over time')
  .toSpec()

  render("view", vlSpec);
  render("view2", vlSpec2);
  render("view3", vlSpec3);
  render("view4", vlSpec4);

});


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}



// function renderViz1(data){
//     const spec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "data": { "values": data },
//         "mark": "circle",
//         "encoding": {
//             "x": { "field": "Genre", "type": "nominal", "title": "Genre" },
//             "y": { "aggregate": "sum", "field": "Global_Sales", "type": "quantitative", "title": "Total Global Sales (millions)" },
//             "color": { "field": "Platform", "type": "nominal", "title": "Platform" },
//             "tooltip": [
//                 { "field": "Genre", "type": "nominal" },
//                 { "field": "Platform", "type": "nominal" },
//                 { "field": "Global_Sales", "type": "quantitative" }
//             ]
//         },
//         "width": 1000,
//         "height": 400,
//         "title": "Global Sales by Genre and Platform"
//     };
//     vegaEmbed('#viz1', spec);
// }

// function renderViz2(data){
//     const spec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "data": { "values": data },
//         "mark": "tick",
//         "encoding": {
//             "x": { "field": "Year", "type": "temporal", "title": "Year" },
//             "y": { "aggregate": "sum", "field": "Global_Sales", "type": "quantitative", "title": "Total Global Sales (millions)" },
//             "color": { "field": "Platform", "type": "nominal", "title": "Platform" },
//             "detail": { "field": "Genre", "type": "nominal" },       
//             "tooltip": [
//                 { "field": "Year", "type": "temporal" },
//                 { "field": "Platform", "type": "nominal" },
//                 { "field": "Genre", "type": "nominal" },
//                 { "field": "Global_Sales", "type": "quantitative" }
//             ]
//         },
//         "width": 1000,
//         "height": 400,
//         "title": "Sales Over Time by Platform and Genre"
//     };
//     vegaEmbed('#viz2', spec);
// }

// function renderViz3(data){
//     const spec = {
//         "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//         "data": { "values": data },
//         "mark": "bar",
        
//         "encoding": {
//             "x": { "field": "Platform", "type": "nominal" },
//             "y": { "aggregate": "sum", "field": "Sales", "type": "quantitative", "title": "Total Sales (millions)" },
//             "color": { "field": "Region", "type": "nominal", "title": "Region" },
//             "tooltip": [
//                 { "field": "Platform", "type": "temporal" },
//                 { "field": "Region", "type": "nominal" },
//                 { "field": "Sales", "type": "quantitative" }
//             ]
//         },
//         "width": 1000,
//         "height": 400,
//         "title": "Regional Sales by Platform"
//     };
//     vegaEmbed('#viz3', spec);
// }

// // vl.markBar()
// //   .data(videoGamesData)
// //   .transform(
// //     vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'])
// //       .as(['Region', 'Sales'])
// //   )
// //   .encode(
// //     vl.x().fieldN('Platform').title('Platform'),
// //     vl.y().sum('Sales').title('Total Sales (millions)'),
// //     vl.color().fieldN('Region').title('Region'),
// //     vl.tooltip(['Platform', 'Region', 'Sales'])
// //   )
// //   .width(1000)
// //   .height(400)
// //   .title('Regional Sales by Platform')
// //   .render()