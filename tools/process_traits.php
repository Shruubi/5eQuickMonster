<?php

define('TRAITS_REF_FILE_PATH', __DIR__ . '/../resources/references/traits.txt');
$fp = fopen(TRAITS_REF_FILE_PATH, 'r');
$buffer = [];

if($fp) {
	while(($line = trim(fgets($fp))) !== false) {
		if(feof($fp)) { break; }
		$len = strlen($line);
		for($i = $len - 1; $i > -1; $i--) {
			if($line[$i] === "(") {
				$ref = trim(substr($line, $i));
				$text = trim(substr($line, 0, $i));
				$parts = explode(':', $text);
				$name = trim($parts[0]);
				$text = trim($parts[1]);
				//echo $ref . PHP_EOL;
				//echo $text . PHP_EOL;
				$buffer[] = ['name' => $name, 'text' => $text, 'reference' => $ref];
				break;
			}
		}
		continue;
	}

	fclose($fp);
}

file_put_contents(__DIR__ . '/../resources/references/traits.json', json_encode($buffer, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
