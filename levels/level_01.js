/* 
 * level_00
 */

(function(l){
	var color = new Color(1, 1, 1, 1);
	
	for(var i = 0; i < 2; ++i) {
		var y = i * -200;
		l.universe.addPlanet( new Planet(universe.center.add(v2(-100, y)), 40, color) );
		l.universe.addPlanet( new Planet(universe.center.add(v2( 100, y)), 40, color) );
	}
})(Level.current);