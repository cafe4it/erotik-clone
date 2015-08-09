var Xray = require('x-ray'),
		_ = require('underscore'),
		thenWriteFile = require('then-write-file');

var x = Xray();


x('http://www.filmiizle.gen.tr/erotik-film',{
	posts : x('#icerik-tekrar .yazi',[
		{
			title : 'div.yazi-sag > h2 > a',
			link : 'div.yazi-sag > h2 > a@href',
			thumbnail : 'div.yazi-sol > a > img@src',
			description : 'div.yazi-sag > div'
		}
	])
})
(function(err, obj){
	//console.log(obj);
	var posts = [];
	_.each(obj, function(i){
		_.each(i.posts,function(j){
			//console.log(j)
			posts.push(j);
		})
	});
	var tpl = _.template('./<%=name%>.json'),
			resultFileName = tpl({name : _.now()});
	thenWriteFile(resultFileName,JSON.stringify(posts, {indent: true}))
		.then(function(res){
			console.log(res);
		})
})
.paginate('#icerik-tekrar > div.wp-pagenavi > a.nextpostslink@href')
.limit(1)
