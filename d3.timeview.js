(function() {

  d3.timeview = function() {
    var barHeight = 20,
      gap = barHeight + 4,
      width = 1160,
      height = 500,
      sidePadding = 200,
      dateFormat = d3.time.format("%Y-%m-%d");


    function timeview(a) {

      if(a instanceof Array) {
        a.each(__timeview);
      } else {
        d3.select(this).each(__timeview);
      }

    }

    function __timeview(d) {
      var ele = d3.select(this),
        _data = (typeof(data) === "function" ? data(d) : data),
        height = (typeof(height) === "function" ? height(d) : gap * _data.nodes.length + 60),
        x = d3.time.scale()
          .domain([
            d3.min(_data.nodes, function (d) { return dateFormat.parse(d.startDate); }),
            d3.max(_data.nodes, function (d) { return dateFormat.parse(d.endDate); })
          ])
          .range([width * 0.10, width - 240]);

      // Append the main svg
      var svg = ele.append('div')
        .attr('class', 'gantt')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var svgHeader = ele.append('div')
        .attr('class', 'ganttHeader')
        .append("svg")
        .attr("width", width)
        .attr("height", 60);

      createGrid();
      createHeader();
      createProjects();
      createLegend();
      todayLine();

      function createGrid() {
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient('top')
          .ticks(d3.time.months)
          .tickSize(-height, 1, 0)
          .tickFormat(d3.time.format("%m/%y"));

        var grid = svg.append('g')
          .attr('class', 'grid')
          .attr('transform', 'translate(' + sidePadding + ', ' + 0 + ')')
          .call(xAxis).selectAll("text")
          .style("text-anchor", "start")
          .attr("fill", "#000")
          .attr("stroke", "none")
          .attr("font-size", 10)
          .attr("dy", 20)
          .attr("dx", -50)
          .attr("transform", "rotate(-70)");
      }
      function createHeader() {

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient('top')
          .ticks(d3.time.months)
          .tickSize(-60, 0, 0)
          .tickFormat(d3.time.format("%m/%y"));

        svgHeader.append('rect')
          .attr('width', width)
          .attr('height', 60)
          .attr('fill', 'white');

        svgHeader.append('g')
          .attr('class', 'header')
          .attr('transform', 'translate(' + sidePadding + ', ' + 0 + ')')
          .call(xAxis).selectAll("text")
          .style("text-anchor", "start")
          .attr("fill", "#000")
          .attr("stroke", "none")
          .attr("font-size", 10)
          .attr("dy", 20)
          .attr("dx", -50)
          .attr("transform", "rotate(-70)");

      }
      function createProjects() {

        // Group each project.
        var rectangles = svg.append('g')
          .attr("transform", function (d, i) {
            return "translate(" + sidePadding + "," + 60 + ")";
          })
          .selectAll("rect")
          .data(_data.nodes)
          .enter().append('g')
          .attr("transform", function (d, i) {
            return "translate(" + 0 + "," + (i * gap + 2) + ")";
          });

        // Total box.
        rectangles.append("rect")
          .attr("x", function (d) {
            return x(dateFormat.parse(d.startDate));
          })
          .attr("width", function (d) {
            return x(dateFormat.parse(d.endDate)) - x(dateFormat.parse(d.startDate));
          })
          .attr("height", barHeight)
          .attr("fill", '#FF8080');

        // Progress box on project total box.
        rectangles.append('rect')
          .attr("x", function (d) {
            return x(dateFormat.parse(d.startDate));
          })
          .attr("width", 0)
          .attr("height", barHeight)
          .attr("fill", '#99CCFF')
          .transition()
          .duration(1000)
          .attr('width', function (d) {
            var total = x(dateFormat.parse(d.endDate)) - x(dateFormat.parse(d.startDate));
            var ratio = d.real / d.planed;

            if ((d.real / d.planed) > 1) {
              ratio = 1
            }

            return ratio * total;
          });


        // Progress text after total box.
        rectangles.append('text')
          .attr('y', 15)
          .attr('x', function (d) {
            return x(dateFormat.parse(d.startDate)) + (x(dateFormat.parse(d.endDate)) - (x(dateFormat.parse(d.startDate))) + 5);
          })
          .attr('fill', 'black')
          .attr('font-size', 11)
          .attr('font-weight', 'bold')
          .text(function (d) {
            return Math.round(d.real / d.planed * 100) + '%';
          });
      }
      function createLegend() {

        // Append Even and Odd background for each project.
        var legend = svg.append("g")
          .attr('transform', 'translate(' + 3 + ', ' + 60 + ')')
          .selectAll("rect")
          .data(_data.nodes)
          .enter().append('g');

        legend.append("rect")
          .attr("x", 0)
          .attr("y", function (d, i) {
            return i * gap;
          })
          .attr("width", function () {
            return width - 6;
          })
          .attr("height", gap)
          .attr("stroke", "none")
          .attr("fill", function (d, i) {
            return i % 2 !== 0 ? 'white' : '#7F7F7F';
          })
          .attr("opacity", 0.2);

        // Name of project.
        legend.append("text")
          .text(function (d) {
            return d.name;
          })
          .attr("x", 10)
          .attr("y", function (d, i) {
            return i * gap + 16;
          })
          .attr("font-size", 11)
          .attr("text-anchor", "start")
          .attr("text-height", 14)
          .attr("fill", 'black');
      }
      function todayLine() {
        svg.append("line")
          .attr("x1", function () {
            var today = new Date();

            return x(today) + sidePadding;
          })
          .attr("y1", 0)
          .attr("x2", function () {
            var today = new Date();

            return x(today) + sidePadding;
          })
          .attr("y2", this.h)
          .style("stroke", '#1F8F1F');
      }

    }

    timeview.data = function(_) {
      if (!arguments.length) return data;
      data = _;
      return timeview;
    };

    timeview.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return timeview;
    };

    return timeview;
  };

})();
