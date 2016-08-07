(function(){

	window.strParse( str, data ){
		if( undefined === data ) return str;
		var len 	= str.length,
			char   	= '',
			flag   	= false,
			_      	= this,
			result	= '';

		var start_tag,
			end_tag,
			name_tag;


		_.readName = function( s, p ){
			var pos  = p,
				name = '',
				c 	 = '',
				f 	 = false;

			while( pos --> 0 ){
				c = s.charAt( pos );

				if( ' ' === c ){
					continue;
				}

				if( '{' === c && f ){
					break;
				}
				else if( '{' === c ){
					f = true;
				}
				else{
					name += c;
				}
			}

			start_tag = pos;
			len  = pos;

			return name.split('').reverse().join('');
		}

		while( len --> 0 ){
			char = str.charAt( len );

			if( '}' === char && flag ){

				end_tag  = len - 1;
				name_tag = _.readName( str, len );
				flag = false;

			}
			else if( '}' === char ){
				flag = true;
				continue;
			}

			if(
				start_tag !== undefined &&
				name_tag  !== undefined &&
				end_tag   !== undefined
			){
				v = data[ name_tag ] || name_tag;
				ll = v.length;

				while( ll --> 0 ){
					result += v[ ll ];
				}

				start_tag 	= undefined;
				name_tag 	= undefined;
				end_tag 	= undefined;
			}
			else{
				result += char;
			}

		}

		return result.split('').reverse().join('');
	}

	String.prototype.parse = function( data ){
		return window.strParse( this, data );
	}
	
	console.log( window.strParse( 'to {{str}}', { str: "test" } ) );
	console.log( 'to jest {{str}}'.parse( { str: 'test' } ) );

})();
