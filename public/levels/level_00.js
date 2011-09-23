/* 
 * level_00
 */

(function(l){
	var color = new Color(1, 1, 1, 1);
	var d = 150;
	var p = 230;
	var size = 40;
	
	l.planets = [
		new Planet(v2(-d, 0), size, color),
		new Planet(v2( d, 0), size, color),
		new Planet(v2( 0, d), size, color),
		new Planet(v2( 0,-d), size, color) 
	];

	l.dots = [
		new Dot(v2(0, 0)),
		new Dot(v2(-p, 0)),
		new Dot(v2( p, 0)),
		new Dot(v2( 0, p)),
		new Dot(v2( 0,-p))
	];
	
	l.ship.pos.set(100, 100);
	l.ship.speed.set(-45, -45)
	
})(Level.current);