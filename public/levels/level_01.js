/* 
 * level_00
 */

(function(l){
	var color = new Color(0.5, 0.5, 1, 1);
	
	for(var i = 0; i < 2; ++i) {
		var y = i * -200;
		l.planets.push( new Planet(v2(-100, y), 40, color) );
		l.planets.push( new Planet(v2( 100, y), 40, color) );
	}
	l.ship.pos.set(0, 0);
})(Level.current);
