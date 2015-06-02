
var ColorCollectionView = Backbone.View.extend({

    template: _.template('<div class="color" style="width: <%= width %>%; background-color: <%= color %>;" ></div>'),
	render: function(){

		var width = 100/(this.collection.length);
        var divs = '';
        for (var i=0; i < this.collection.length; i++){
            var templateObject = {
                width: width,
                color: this.collection.at(i).get('hex')
            }
            divs += this.template(templateObject)
        }
        this.el.innerHTML = divs;
	}
})
