var data = {
  config: {
    sortBy: 'time'
  },
  nodes: [
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Vigie des marchés et produits',
      startDate: '2014-02-02',
      endDate: '2014-10-02',
      planed: 64,
      real: 16
    },
    {
      name: 'Support en continu aux ventes',
      startDate: '2013-02-02',
      endDate: '2014-03-02',
      planed: 32,
      real: 16
    },
    {
      name: 'Support en continu à la commercialisation',
      startDate: '2014-01-02',
      endDate: '2014-04-02',
      planed: 10,
      real: 16
    },
    {
      name: 'Rencontre équipe',
      startDate: '2014-01-02',
      endDate: '2014-03-02',
      planed: 300,
      real: 200
    },
    {
      name: 'Rencontre de revue de dossier',
      startDate: '2013-06-02',
      endDate: '2014-02-12',
      planed: 64,
      real: 58
    },
    {
      name: 'Administratif',
      startDate: '2014-05-02',
      endDate: '2014-06-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Présentation des dossiers aux divers comités décisionnels',
      startDate: '2014-04-02',
      endDate: '2014-12-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Comités multisecteurs des gammes',
      startDate: '2013-04-02',
      endDate: '2014-05-08',
      planed: 64,
      real: 58
    },
    {
      name: 'Demandes ponctuelles/entretien',
      startDate: '2013-01-02',
      endDate: '2014-02-08',
      planed: 64,
      real: 58
    },
    {
      name: 'Stratégie de tarification des fonds',
      startDate: '2014-04-02',
      endDate: '2014-04-32',
      planed: 2,
      real: 58
    },
    {
      name: 'Tarification des régimes',
      startDate: '2014-01-02',
      endDate: '2014-10-08',
      planed: 64,
      real: 32
    },
    {
      name: 'Diagnostic REEE',
      startDate: '2014-10-02',
      endDate: '2014-12-30',
      planed: 64,
      real: 0
    },
    {
      name: 'Évolution des régimes fiscaux (Fiducie) demande ad hoc',
      startDate: '2014-01-02',
      endDate: '2014-02-08',
      planed: 64,
      real: 58
    },
    {
      name: 'Bulletins (Info Fonds, Réalisez-vous, Focus, Expertise, etc.)',
      startDate: '2014-05-02',
      endDate: '2014-10-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Bulletins (Info Fonds, Réalisez-vous, Focus, Expertise, etc.)',
      startDate: '2014-05-02',
      endDate: '2014-10-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Bulletins (Info Fonds, Réalisez-vous, Focus, Expertise, etc.)',
      startDate: '2014-05-02',
      endDate: '2014-10-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Bulletins (Info Fonds, Réalisez-vous, Focus, Expertise, etc.)',
      startDate: '2014-05-02',
      endDate: '2014-10-08',
      planed: 64,
      real: 0
    },
    {
      name: 'Bulletins (Info Fonds, Réalisez-vous, Focus, Expertise, etc.)',
      startDate: '2014-01-02',
      endDate: '2015-02-08',
      planed: 44,
      real: 33
    }
  ]
};


/**
 * Gantt Module Class
 * @param _data
 * @param className
 * @constructor
 */
 var GanttModule = function (_data, className) {

  var self = this;

  this.w = 1160;
  this.sidePadding = 200;
  this.barHeight = 20;
  this.gap = this.barHeight + 4;
  this._data = _data;
  this.className = className;
  this.h = this._data.nodes.length * this.gap + 60;
  this.dateFormat = d3.time.format("%Y-%m-%d");
  this.x = d3.time.scale()
    .domain([d3.min(this._data.nodes, function (d) {
      return self.dateFormat.parse(d.startDate);
    }),
      d3.max(this._data.nodes, function (d) {
        return self.dateFormat.parse(d.endDate);
      })])
    .range([200, this.w - 240]);

};

/**
 * Init Function
 */
GanttModule.prototype.init = function () {

  // Append the main svg
  this.svg = d3.select(this.className).append('div')
    .attr('class', 'gantt')
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h);

  this.svg2 = d3.select(this.className).append('div')
    .attr('class', 'ganttHeader')
    .append("svg")
    .attr("width", this.w)
    .attr("height", 60);

  this._createGrid();
  this._createProjectBox();
  this._createLegend();
  this._todayLine();
  this._createHeader();

};

/**
 * Create header axis.
 * @private
 */
GanttModule.prototype._createHeader = function () {

  var xAxis = d3.svg.axis()
    .scale(this.x)
    .orient('top')
    .ticks(d3.time.months)
    .tickSize(-60, 0, 0)
    .tickFormat(d3.time.format("%m/%y"));

  this.svg2.append('rect')
    .attr('width', this.w)
    .attr('height', 60)
    .attr('fill', 'white');

  this.svg2.append('g')
    .attr('class', 'header')
    .attr('transform', 'translate(' + this.sidePadding + ', ' + 0 + ')')
    .call(xAxis).selectAll("text")
    .style("text-anchor", "start")
    .attr("fill", "#000")
    .attr("stroke", "none")
    .attr("font-size", 10)
    .attr("dy", 20)
    .attr("dx", -50)
    .attr("transform", "rotate(-70)");

};

/**
 * Create grid for time axis
 * @private
 */
GanttModule.prototype._createGrid = function () {

  var xAxis = d3.svg.axis()
    .scale(this.x)
    .orient('top')
    .ticks(d3.time.months)
    .tickSize(-this.h, 1, 0)
    .tickFormat(d3.time.format("%m/%y"));

  var grid = this.svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(' + this.sidePadding + ', ' + 0 + ')')
    .call(xAxis).selectAll("text")
    .style("text-anchor", "start")
    .attr("fill", "#000")
    .attr("stroke", "none")
    .attr("font-size", 10)
    .attr("dy", 20)
    .attr("dx", -50)
    .attr("transform", "rotate(-70)");

};

GanttModule.prototype._createProjectBox = function () {

  var self = this;

  // Group each project.
  var rectangles = this.svg.append('g')
    .attr("transform", function (d, i) {
      return "translate(" + self.sidePadding + "," + 60 + ")";
    })
    .selectAll("rect")
    .data(this._data.nodes)
    .enter().append('g')
    .attr("transform", function (d, i) {
      return "translate(" + 0 + "," + (i * self.gap + 2) + ")";
    });

  // Total box.
  rectangles.append("rect")
    .attr("x", function (d) {
      return self.x(self.dateFormat.parse(d.startDate));
    })
    .attr("width", function (d) {
      return self.x(self.dateFormat.parse(d.endDate)) - self.x(self.dateFormat.parse(d.startDate));
    })
    .attr("height", this.barHeight)
    .attr("fill", '#FF8080');

  // Progress box on project total box.
  rectangles.append('rect')
    .attr("x", function (d) {
      return self.x(self.dateFormat.parse(d.startDate));
    })
    .attr("width", 0)
    .attr("height", this.barHeight)
    .attr("fill", '#99CCFF')
    .transition()
    .duration(1000)
    .attr('width', function (d) {
      var total = self.x(self.dateFormat.parse(d.endDate)) - self.x(self.dateFormat.parse(d.startDate));
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
      return self.x(self.dateFormat.parse(d.startDate)) + (self.x(self.dateFormat.parse(d.endDate)) - (self.x(self.dateFormat.parse(d.startDate))) + 5);
    })
    .attr('fill', 'black')
    .attr('font-size', 11)
    .attr('font-weight', 'bold')
    .text(function (d) {
      return Math.round(d.real / d.planed * 100) + '%';
    });

};

/**
 * Create legend at left
 * @private
 */
GanttModule.prototype._createLegend = function () {

  var self = this;

  // Append Even and Odd background for each project.
  var legend = this.svg.append("g")
    .attr('transform', 'translate(' + 3 + ', ' + 60 + ')')
    .selectAll("rect")
    .data(this._data.nodes)
    .enter().append('g');

  legend.append("rect")
    .attr("x", 0)
    .attr("y", function (d, i) {
      return i * self.gap;
    })
    .attr("width", function () {
      return self.w - 6;
    })
    .attr("height", this.gap)
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
      return i * self.gap + 16;
    })
    .attr("font-size", 11)
    .attr("text-anchor", "start")
    .attr("text-height", 14)
    .attr("fill", 'black');

};

/**
 * Create Today line
 * @private
 */
GanttModule.prototype._todayLine = function () {

  var self = this;

  this.svg.append("line")
    .attr("x1", function () {
      var today = new Date();

      return self.x(today) + self.sidePadding;
    })
    .attr("y1", 0)
    .attr("x2", function () {
      var today = new Date();

      return self.x(today) + self.sidePadding;
    })
    .attr("y2", this.h)
    .style("stroke", '#1F8F1F');
};

var test = new GanttModule(data, '.box1');

test.init();
