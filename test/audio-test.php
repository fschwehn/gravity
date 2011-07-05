<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>GravityRace - Test</title>
		<style type="text/css">
			body {
				background-color: #333;
				color: #fff;
				font-family: monospace;
			}
			td {
				border: 1px solid white;
				text-align: center;
			}
			th {
				background-color: white;
				color: #000;
				padding: 5px;
			}
		</style>
    </head>
    <body>
		<h1>GravityRace</h1>
		<h2>Audio Test</h2>
		
		<table>
			<thead>
				<tr>
					<th>Format</th>
					<th>Tag</th>
					<th>canplay</th>
					<th>Audio-Object</th>
				</tr>
			</thead>
			<tbody>
			<?php
			$formats = array('wav', 'mp3', 'ogg');

			foreach($formats as $format):
				$id = 'tag_' . $format;
				$src = '/audio/' . $format . '.' . $format;
				$type = 'audio/' . $format;
				?>
				<tr>
					<td>
						<?php echo $format ?>
					</td>
					<td>
						<audio id="<?php echo $id ?>" src="<?php echo $src ?>" type="<?php echo $type ?>" controls>No Audio Tag supported</audio>
					</td>
					<td>
						<p id="<?php echo $id ?>_canplay">false</p>
					</td>
					<td>
						<button data-src="<?php echo $src ?>">play</button>
					</td>
				</tr>
			<?php endforeach ?>
			</tbody>
		</table>

		<script src="/js/lib/jquery-1.6.1.min.js"></script>
		<script>
			// check canplay events
			$('audio').bind('canplay', function(){
				var id = $(this).attr('id') + '_canplay';
				$('#' + id).text('true');
			})
			
			// buttons
			$('button').click(function(){
				var $button = $(this).css('color', 'red');
				var src = $button.data('src');
				var audio = new Audio();
				
				audio.src = src;
				
				$(audio)
					.bind('canplay', function(){
						audio.play();
						$button.css('color', '#0d0');
					})
					.bind('error', function(){
						alert('error')
					})
			})
		</script>
    </body>
</html>
