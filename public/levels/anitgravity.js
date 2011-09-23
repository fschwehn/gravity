/* 
 * antigravity
 */

(function(l){
	var color = new Color(1, 0.5, 0.5, 0.5);
	var d = 150;
	var p = 230;
	var size = 40;
	
	l.planets = [
		new Planet(v2(-d, 0), size, color, true),
		new Planet(v2( d, 0), size - 2, color, true),
		new Planet(v2( 0, d), size, color, true),
		new Planet(v2( 0,-d), size + 4, color, true) 
	];

	l.dots = [
		new Dot(v2(0, 0)),
		new Dot(v2(-p, 0)),
		new Dot(v2( p, 0)),
		new Dot(v2( 0, p)),
		new Dot(v2( 0,-p))
	];
	
	l.ship.pos.set(0, 0);
	l.ship.speed.set(0, 0)
	
})(Level.current);