/* 
 * level_00
 */

(function(l, u){
	var color = new Color(1, 1, 1, 1);
	var d = 150;
	var size = 40;
	
	u.addPlanet(new Planet(v2(-d, 0), size, color) );
	u.addPlanet(new Planet(v2( d, 0), size, color) );
	u.addPlanet(new Planet(v2( 0, d), size, color) );
	u.addPlanet(new Planet(v2( 0,-d), size, color) );
	
	u.ship.pos = v2(0, 0);
})(Level.current, Level.current.universe);