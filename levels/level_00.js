/* 
 * level_00
 */

(function(l, u){
	var color = new Color(1, 1, 1, 1);
	var d = 150;
	var p = 230;
	var size = 40;
	
	u.addPlanet(new Planet(v2(-d, 0), size, color) );
	u.addPlanet(new Planet(v2( d, 0), size, color) );
	u.addPlanet(new Planet(v2( 0, d), size, color) );
	u.addPlanet(new Planet(v2( 0,-d), size, color) );

	u.addDot(new Dot(v2(0, 0)))
	u.addDot(new Dot(v2(-p, 0)))
	u.addDot(new Dot(v2( p, 0)))
	u.addDot(new Dot(v2( 0, p)))
	u.addDot(new Dot(v2( 0,-p)))
	
	u.ship.pos = v2(100, 100);
	
})(Level.current, Level.current.universe);