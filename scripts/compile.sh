#!/bin/bash

js_path=`dirname $0`/../public/js

coffee -c -o $js_path/compiled $js_path/coffee
