;var tuc_javascript = (function(){return {
	dialog: '',										//弹窗的保存数据
	client: Client,
	tools:Tools,
	ajaxPath: path_ajax ,					//AJAX后台的接口
	reflash: false,									//用于进行防多次点击的标志
	reg: Tools.filterReg(),							//链接地址带参数的保存数据
	platform:Client.env.platform,					//获取平台
	isClient:Client.env.isClient,					//获取是否游戏盒
	c: {open: 1},									//配置数据
	templats:{
		"android":[],
		"ios":[],
		"unknow":[]
	},
	platformOpen:{									//平台开放
		ios:true,
		android:true,
		unknow:false
	},
	clientVersion:{								//版本号控制
		android:"2.9.0.0",
		ios:"2.0.0.0",
	},
	_:function(){for(var i in this){var t=this;if(typeof t[i]=="function" && i.search(/^_/)==-1){t[i]();}};return this;},
	_commFunc_settime:function(){
		var _this = this;

	
		_this.templats['android'].push('<div class="ask android gameinfo_item" data-id="{id}" data-index="{index}" style="display:none">');
		_this.templats['android'].push('	<em id="user_stat_{gid}"  class="{stat}"></em>');
		_this.templats['android'].push('	<em class="{tip}"></em>');
		_this.templats['android'].push('	<p class="p-2">首次安装+{down_mark}分，每日体验+{play_mark}积分</p>');
		_this.templats['android'].push('	<div class="k-1 cf">');
		_this.templats['android'].push('		<dl class="fl">');
		_this.templats['android'].push('			<dt class="fl"><a href="javascript:void(0);" class="show_game" data-mode="{mode}" data-gid="{gid}"><img id="user_download_img_{gid}" src="{img}"></a></dt>');
		_this.templats['android'].push('			<dd class="d-1">{title}</dd>');
		_this.templats['android'].push('			<dd>{mode_info}<span>{size}</span></dd>');
		_this.templats['android'].push('			<dd>{info}</dd>');
		_this.templats['android'].push('		</dl>');
		_this.templats['android'].push('		<a href="javascript:void(0);" class="fr j-download a1" data-gid="{gid}"><i class="i-1"></i>下载应用</a>');
		_this.templats['android'].push('	</div>');

		_this.templats['android'].push('	<ul class="k-3" style="{img_show}">');
		_this.templats['android'].push('	<li class="sk-1">限时福利（<span style="color:red;">{xsfu_etime}点结束</span>）</li>');
		_this.templats['android'].push('	<li class="sk-2">连续体验<span>{xsfu_days}</span>天，可额外<span>+{xsfu_points}</span>积分</li>');
		_this.templats['android'].push('	<li class="sk-3"><a href="#"  data-gid="{gid}" data-days="{xsfu_days}" class="{lingqu_class} qiandao_days_lingqu_btn" data-qddays="{qiandao_days}">{lingqu_title}</a><p>{qiandao_days_info}</p></li>');
		_this.templats['android'].push('	</ul>');
		_this.templats['android'].push('	</div>');
		_this.templats['android'].push('</div>');





		_this.templats['ios'].push('<div class="ask ios gameinfo_item" data-id="{id}"  data-index="{index}"  style="display:none">');
		_this.templats['ios'].push('	<em class="{tip}"></em>');
		_this.templats['ios'].push('	<em id="user_stat_{gid}_{id}" class="{stat}"></em>');
		_this.templats['ios'].push('	<ul class="k-1 cf">');
		_this.templats['ios'].push('		<dl class="fl">');
		_this.templats['ios'].push('			<dt class="fl"><a href="" class="ios-download1" data-gid="{gid}" data-mode="{mode}"><img src="{img}"></a></dt>');
		_this.templats['ios'].push('			<dd class="d-1">{title}</dd>');
		_this.templats['ios'].push('			<dd>{mode_info}<span>{size}</span></dd>');
		_this.templats['ios'].push('			<dd>{info}</dd>');
		_this.templats['ios'].push('		</dl>');
		_this.templats['ios'].push('		<a href="{gurl}" id="user_download_{gid}" class="fr ios-download a1"  data-gamemode="{gamemode}" data-gid="{gid}"><i class="i-1"></i>立即下载</a>');
		_this.templats['ios'].push('	</ul>');


		_this.templats['ios'].push('<ul class="k-3" style="{img_show}">');
		_this.templats['ios'].push('<li class="sk-1">{img_title1}<a href="" class="show_img a1" style="{showimg_show1}" data-img="{img_url}">查看范例图</a></li>');
		_this.templats['ios'].push('<li class="sk-2" id="userimg_info_{gid}">{img_title2}</li>');
		_this.templats['ios'].push('<li class="sk-3">');
		_this.templats['ios'].push('<a href="#" class="user_img_{gid} user_img {class_stat}"  data-gamemode="{gamemode}" data-jobmode="{jobmode}" data-stat="{gamestat}" data-tixing="{tixing}" data-gid="{gid}" data-iosid="{iosid}" data-step="{step}">{ainfo}</a>');
		_this.templats['ios'].push('<p class="p-1" style="{showimg_marktip_show}">审核通过<span>+{play_mark}</span>积分</p>');
		_this.templats['ios'].push('</li>');
		_this.templats['ios'].push('</ul>');


		_this.templats['ios'].push('	<ul class="k-2 cf" style="{dati_show}">');
		_this.templats['ios'].push('		每日正确答题+<span>{play_mark}</span>积分');
		_this.templats['ios'].push('		<a href="" data-iosid="{iosid}" data-gid="{gid}" data-gamemode="{gamemode}" data-jobmode="{jobmode}"  class="user_answer_{gid} user_answer {class_stat}">{ainfo}</a>');
		_this.templats['ios'].push('	</ul>');
		_this.templats['ios'].push('</div>');


	},
	_dialog:function(id){
		var _this = this;
		if(_this.dialog){
			_this.dialog.close();
			_this.dialog = '';
		}
		_this.dialog = _this['tools'].dialog({id:id,close_id : "."+id+"_close"});
	},
	_isshow:function(showDialog){
		if(typeof showDialog=="undefined"){
			showDialog = true;
		}
		return showDialog;
	},
	_checkPlatform: function (showDialog) {
		//判断平台
		var _this = this;
		if(!_this['client']){
			if(_this._isshow(showDialog)){
				_this._dialog("dialog_checkPlatform");
			}
			return false;
		}
		if(!_this['platformOpen'][_this['platform']]){
			if(_this._isshow(showDialog)){
				_this._dialog("dialog_checkPlatform");
			}
			return false;
		}
		return true;
	},
	_checkVersion: function (showDialog) {
		//判断版本号
		var _this = this;
		if( Client.checkVersion( _this['clientVersion'][ _this['platform'] ] ,'<')){
			if(_this._isshow(showDialog)){
				_this._dialog("dialog_checkVersion_"+_this['platform']);
			}
			return false;
		}
		return true;
	},
	_checkOpen: function (showDialog) {
		//验证活动是否开放
		var _this = this;
		if(_this['c']['hopen']==0){
			if(_this._isshow(showDialog)){
				_this._dialog("dialog_checkOpen");
			}
			return false;
		}
		return true;
	},
	_checkMobileLogin:function(showDialog){
		var _this = this;
		if(_this['c']['login'] == 1 && _this['c']['userMobileAllow']!=1){
			if(_this._isshow(showDialog)){
				$("#dialog_checkMobileLogin_info").html('你的4399账号<i style="color:red">'+_this['c']['userMobileAllow']+'</i>已经参与过本活动，<br/>一台手机只能有一个4399账号参加本活动，你可以切换回之前的账号哦！');
				_this._dialog("dialog_checkMobileLogin");
			}
			return false;
		}
		return true;
	},
	_checkPlayGame:function(showDialog){
		//判断是否有玩过游戏。
		var _this = this;
		if(_this['c']['userPlayGameStat']==0){
			if(_this._isshow(showDialog)){
				_this._dialog("dialog_checkPlayGame");
			}
			return false;
		}
		return true;
	},
	_checkLogin: function () {
		//验证登录用的。
		var _this = this;
		if (_this['c']['login'] == 0 && _this['client']['scookie'] == '') {
			_this['client'].login("tuc_javascript._loginCallback");
			return false;
		}
		return true;
	},
	_check:function(type,showDialog,flag){
		var _this = this;
        if(!_this._comm_check(type,showDialog,flag)){
            return false;
        }
        if(!_this._checkDenyUid()){
            return false;
        }
		return true;
    },
    _comm_check :function(type,showDialog,flag){
        var _this = this;

		//判断是否活动开放
		if(type>=1 && !_this._checkOpen(showDialog)){
			return false;
		}

		//判断是否平台
		if(type>=2 && !_this._checkPlatform(showDialog)){
			return false;
		}
		//判断是否版本
		if(type>=3 && !_this._checkVersion(showDialog)){
			return false;
		}

		//判断单台手机
		if(type>=4 && !_this._checkMobileLogin(showDialog)){
			return false;
        }

        if(!flag && window.android){
			if(typeof window.android.onCheckEmulator=='function'){
				var obj = window.android.onCheckEmulator("{isShow:0}");
				obj = JSON.parse(obj);
				if(obj['enu']*1==1){
					_this._alert("本活动的兑换签到卡和领取额外积分功能须在<i>手机端</i>才能正常使用。");
					return false;
				}
			}
        }
        
        //判断是否登录
		if(type>=5 && !_this._checkLogin(showDialog)){
            return false;
        }
        

        return true;
    },
    _checkDenyUid:function(){
        var _this = this;
        // alert(_this['c']['denyuid']);
        if(_this['c']['denyuid']*1==1){
            _this._alert("经检测，<span style='color:red;font-weight:800;'>你的账号操作存在异常</span>，因此无法参与本活动。若有疑义，请加入游戏盒签到反馈群（群号：456878105），联系管理员申诉，加群时请备注加群理由~");
            return false;
        }
        return true;
    },
	_loginCallback : function () {				//JS接口调用后的回调函数
		var _this = this;
		var param = {ac: "login",t: _this['reg']['t'],r: Math.random()};
		_this['client'].loginReload(_this.ajaxPath,param,_this._loginCallbackFunc);
	},
	login: function () {							//登录函数
		var _this = this;
		if(_this._beforeLoginCallFunc()){
			var param = {ac: "login",t: _this['reg']['t'],r: Math.random()};
			if (_this.isClient) {
				_this['client'].loginReload(_this.ajaxPath,param,_this._loginCallbackFunc);
		return false;
			} else {
				_this['client'].get(_this.ajaxPath,param,_this._loginCallbackFunc);
			}
		};
	},
	_loginCallbackFunc: function (msg) {			//登录后的回调函数

		var _this = tuc_javascript;
		
		_this['c'] = msg['config'];
		
		_this._endNoneLoginCallFunc();
		if (_this['c']['login'] == 0) {
			$("#hd_login1").click(function () {
				if (!_this._check(4)) {return false;}
				_this['client'].login("tuc_javascript._loginCallback");
				return false;
			});
		}else{
			
			_this._endYesLoginCallFunc(msg);
		}

	},
	_beforeLoginCallFunc:function(){
		var _this = this;
		
		_this._commFunc_settime();
		
		_this._comm_check(3,true,true);


		return true;
	},
	_endNoneLoginCallFunc: function () {
		var _this = this;
		
		/***********************登录前的初始化*******************************/

		$("#hd_canjia").html(_this['c']['canjia']);
		
		_this._game();
		_this._duihuang();


		if(_this.platform=="ios"){
			for(var i in _this['c']['ios_play_stat']){
				_this._ios_gameStatInit(i);
			}
		}

		
		$("#hd_reback_url").click(function(){
			if(!_this._comm_check(3)){return false;}
			window.location.href = "http://m.4399.cn/zqhd-yy.html";
			return false;
		});

		/***********************登录前的初始化结束*******************************/
	},
	_endYesLoginCallFunc: function (msg) {
		var _this = this;
		/***********************登录后的初始化*******************************/

		$("#hd_login1").parent().hide();

		var str = [];
		str.push('<li class="n-1"><img src="//a.3304399.net/'+msg['uid']+'/small"><p>'+msg['name']+'</p></li>');
		str.push('<li class="n-2">积分<i class="user_mark">'+msg['config']['mark']+'</i></li>');
		$("#hd_login2").show().html(str.join(""));
		$(".user_mark").html(msg['config']['mark']);


		$("#user_supplementary_card").html(msg['config']['supplementary_card']);
		$("#user_accelerator_card").html(msg['config']['accelerator_card']);
		$("#user_glory_card").html(msg['config']['glory_card']);
		$("#user_strong_card").html(msg['config']['strong_card']);

		if(msg['config']['show_dialog']*1==1){
			_this._dialog("dialog_gonggao1");
        }
        
        _this._checkDenyUid();

		/***********************登录后的初始化结束*******************************/
	},
	_ios_gameStatInit:function(gid){
		var _this = this;

		if(_this['c']['ios_play_stat'][gid]*1==-1 || _this['c']['ios_play_stat'][gid]*1==1){
			if(_this['c']['ios_play_stat'][gid]*1==1){
				if(!_this['c']['question_stat'][gid] || _this['c']['question_stat'][gid]['ok']==0){
					//还未答题
					if(!_this['c']['question_stat'][gid] || _this['c']['question_stat'][gid]['stat']<_this['c']['ios_answer_num']){
						//次数已经没有。
						$(".user_answer_"+gid).removeClass("false");
					}else{
						$(".user_answer_"+gid).addClass("false").html("已答题");
					}
				}else{
					$(".user_answer_"+gid).addClass("false").html("已答题");
				}
			}
		}else{
			_this._ios_gameSetTime(gid);
		}
	},
	_ios_gameSetTime:function(gid){
		var _this = this;
		setTimeout(function(){
			var param = {ac: "iosdownload",gid:gid,t: _this['reg']['t'],r: Math.random()};
			_this['client'].get(_this.ajaxPath,param,function(msg){
				if(msg['key']!='ok'){
					return false;
				}
				$(".user_answer_"+gid).removeClass("false");
				_this['c']['ios_play_stat'][gid] = 1;
				return false;
			});
		},_this['c']['ios_delay_time'][gid]);
	},
	_game:function(){
		var _this = this;

		var gameinfo_list= _this['c']['gameinfo_list'];
		var html = [];

		var pagenum = $("#load_game").data("pagenum");
		var templats = _this.templats[_this.platform].join("");
		for(var i in gameinfo_list){
			var _game = gameinfo_list[i];
			var temp = templats;

			//处理模板
			temp = temp.replace(/{index}/g,i);
			for(var j in _game){
				var reg = new RegExp("{"+j+"}","g");
				temp = temp.replace(reg,_game[j]);
			}

			//角标的处理。hot new角标
			var tip = _game['hot']*1==1?"hot":(_game['new']*1==1?"new":"");
			temp = temp.replace(/{tip}/g,tip);

			//安卓，IOS分别处理
			if(_this.platform=="android"){
				//安卓
				var stat = typeof _this['c']['play_stat'][_game['gid']] =="undefined"?"": (_this['c']['play_stat'][_game['gid']]==1?"get":"")
				temp = temp.replace(/{stat}/g,stat);

				if(_game['xsfu_open']*1==1){
					temp = temp.replace(/{img_show}/g,'display:block;');
				}else{
					temp = temp.replace(/{img_show}/g,'display:none;');
				}
				// temp = temp.replace(/{user_xsfu_days}/g,0);

				switch(_game['qiandao_lingqu']*1){
					case 1:
						temp = temp.replace(/{lingqu_class}/g,"a2");
						temp = temp.replace(/{lingqu_title}/g,"已经领取");
						break;
					case 2:
						temp = temp.replace(/{lingqu_class}/g,"a2");
						temp = temp.replace(/{lingqu_title}/g,"任务未开始");
						break;
					case 3:
						temp = temp.replace(/{lingqu_class}/g,"a2");
						temp = temp.replace(/{lingqu_title}/g,"限时福利结束");
						break;
					case 4:
						temp = temp.replace(/{lingqu_class}/g,"a4");
						temp = temp.replace(/{lingqu_title}/g,"点击领取");
						break;
					default :
						temp = temp.replace(/{lingqu_class}/g,"a4");
						temp = temp.replace(/{lingqu_title}/g,"点击领取");
				}


			}else if(_this.platform=="ios"){

				temp = temp.replace(/{jobmode}/g , _game['job_mode']);
				temp = temp.replace(/{gamemode}/g , _game['game_mode']);
				temp = temp.replace(/{iosid}/g,_game['id']);
				
				if(_game['job_mode']==1){


					temp = temp.replace(/{dati_show}/g,'display:none;');
					temp = temp.replace(/{img_show}/g,'display:block;');
					

					var _gameimginfo = _game['gameimginfo'];
					temp = temp.replace(/{img_url}/g,_gameimginfo['img']);
					temp = temp.replace(/{step}/g , _gameimginfo['step']);

					temp = temp.replace(/{img_title1}/g,_gameimginfo['info1']);
					temp = temp.replace(/{img_title2}/g,_gameimginfo['info']);
					temp = temp.replace(/{gamestat}/g,_gameimginfo['stat']);
					temp = temp.replace(/{tixing}/g,_gameimginfo['tixing']);

					switch(_gameimginfo['stat']){
						case "-1":
							temp = temp.replace(/{stat}/g,"");
							temp = temp.replace(/{class_stat}/g,"true");
							temp = temp.replace(/{ainfo}/g,"上传图片");
							temp = temp.replace(/{showimg_show}/g,'display:block;');
							temp = temp.replace(/{showimg_show1}/g,'display:inline-block;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:block;float:left;');
							break;
							case "0":
							temp = temp.replace(/{stat}/g,"");
							temp = temp.replace(/{class_stat}/g,"true");
							temp = temp.replace(/{ainfo}/g,"图片审核中");
							temp = temp.replace(/{showimg_show}/g,'display:block;');
							temp = temp.replace(/{showimg_show1}/g,'display:inline-block;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:block;float:left;');
							break;
							case "1":
							temp = temp.replace(/{stat}/g,"get");
							temp = temp.replace(/{class_stat}/g,"a4-no");
							temp = temp.replace(/{ainfo}/g,"审核通过");
							temp = temp.replace(/{showimg_show}/g,'display:block;');
							temp = temp.replace(/{showimg_show1}/g,'display:inline-block;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:block;float:left;');
							break;
							case "2":
							temp = temp.replace(/{stat}/g,"lost");
							temp = temp.replace(/{class_stat}/g,"true");
							temp = temp.replace(/{ainfo}/g,"重新上传");
							temp = temp.replace(/{showimg_show}/g,'display:block;');
							temp = temp.replace(/{showimg_show1}/g,'display:inline-block;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:block;float:left;');
							break;
							case "3":
							temp = temp.replace(/{stat}/g,"");
							temp = temp.replace(/{class_stat}/g,"a4-no");
							temp = temp.replace(/{ainfo}/g,"提醒小编");
							temp = temp.replace(/{showimg_show}/g,'display:none;');
							temp = temp.replace(/{showimg_show1}/g,'display:none;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:none;');
							break;
							case "4":
							temp = temp.replace(/{stat}/g,"");
							temp = temp.replace(/{class_stat}/g,"a4-no");
							temp = temp.replace(/{ainfo}/g,"任务已结束");
							temp = temp.replace(/{showimg_show}/g,'display:none;');
							temp = temp.replace(/{showimg_show1}/g,'display:none;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:none;');
							break;
							case "5":
							temp = temp.replace(/{stat}/g,"get");
							temp = temp.replace(/{class_stat}/g,"a4-no");
							temp = temp.replace(/{ainfo}/g,"审核通过");
							temp = temp.replace(/{showimg_show}/g,'display:block;');
							temp = temp.replace(/{showimg_show1}/g,'display:inline-block;');
							temp = temp.replace(/{showimg_marktip_show}/g,'display:block;float:left;');
						}
						
						
				}else{

					temp = temp.replace(/{dati_show}/g,'display:block;');
					temp = temp.replace(/{img_show}/g,'display:none;');

					//ios
					if(_this['c']['question_stat'][_game['gid']] && _this['c']['question_stat'][_game['gid']]['ok']==1){
						temp = temp.replace(/{stat}/g,"get");
						temp = temp.replace(/{ainfo}/g,"已答题");
						temp = temp.replace(/{class_stat}/g,"a4-no");
					}else{
						temp = temp.replace(/{stat}/g,"");
						temp = temp.replace(/{ainfo}/g,"今日答题");
						temp = temp.replace(/{class_stat}/g,"true");
					}

				}
				

				

			}

			html.push(temp);
		}
		$("#gamelist").html(html.join(""));
		var all_num = $(".gameinfo_item").size();
		var visiable_num = 0;
		function show_page(pagenum,flag){
			var index = pagenum;
			$(".gameinfo_item").each(function(){
				if(index<=0){
					return false;
				}
				if($(this).css("display")=="none"){
					index--;
					visiable_num++;
					$(this).css("display","block");
				}
			});
			if(visiable_num<all_num){
				$("#load_game").show().html('<span class="s-1"></span>查看更多');
			}else{
				$("#load_game").html('<span class="s-2"></span>点击收起');
			}
			if(flag){
				window.scrollTo(0,$("#game_list_title").offset().top);
			}
		}
		show_page(pagenum);

		$("#load_game").click(function(){
			var flag = false;
			if(visiable_num>=all_num){
				visiable_num = 0;
				flag = true;
				$(".gameinfo_item").hide();
			}
			show_page(pagenum,flag);
			return false;
		});


		if (_this['isClient']) {

			if(_this['platform'] == "android"){

				$(".show_game").each(function(){
					$(this).click(function(){
						if($(this).data("mode")==0){
							window.android.onJsToGameDetails($(this).data("gid")+"");
						}
						return false;
					});
					
				});
				
				var click_item = null;
				var play_gids = [];
				var click_playgames_id = [];

				$(".gameinfo_item").each(function(index){
					var _that = this;
					var index = $(this).data("index");
					var gameinfo = _this['c']['gameinfo_list'][index]['gameinfo'];
					
					var item = $(_that).find(".j-download");
					
					//判断是否有下载，进行替换相应的文案。
					if( typeof window.android.isGameInstalled=='function'){
						if(window.android.isGameInstalled(gameinfo['packag'])==1 ) {
							item.html('<i class="i-2">体验</i>点击体验');
							play_gids.push(gameinfo['id']);
						}else{
							item.html('<i class="i-1"></i>立即下载');
						}
					}
					
					var data_gameinfo = {
						id:gameinfo['id'],
						downloadUrl:encodeURIComponent(gameinfo['downurl']),
						packageName:gameinfo['packag'],
						appName:encodeURIComponent(gameinfo['appname']),
						iconPath:encodeURIComponent(gameinfo['icopath']),
						fileMD5:gameinfo['md5_file']
					};
					$.each(data_gameinfo,function(key,val){$(_that).find(".j-download").data(key,val);});
					// $("#user_download_img_"+gameinfo['id']).attr('src',gameinfo['icopath'].replace("http://","https://"));
                });

                // var download_confirm = false;
                function download_confirm(gid){
                    if(!tuc_javascript._checkLogin()){return false;}
                    var param = {ac: "download_confirm",gid:gid,t: _this['reg']['t'],r: Math.random()};
                    _this['client'].get(_this.ajaxPath,param,function(msg){
                    });
                }

				AndroidDownload.setOption(
					".j-download",
					{
						NO_iNSTALLED:{
							func:function(item,flag){
								if(flag=="click"){
									download_confirm(item.data("id"));
								}
							},
							name:'<i class="i-1"></i>立即下载'
						},DOWNLOADING:{
                            name:'<i class="i-3"></i>正在下载',
                            func:function(item,flag){
								download_confirm(item.data("id"));
							}
						},DOWNLOAD_PAUSE:{
                            name:'<i class="i-5"></i>继续下载',
                            func:function(item,flag){
								download_confirm(item.data("id"));
							}
                            
						},DOWNLOAD_WAIT:{
							name:'<i class="i-5"></i>等待下载',
                            func:function(item,flag){
								download_confirm(item.data("id"));
							}
						},DOWNLOADED:{
							name:'<i class="i-4"></i>开始安装',
                            func:function(item,flag){
								download_confirm(item.data("id"));
                            }
						},INSTALLING:{
                            name:'<i class="i-4"></i>开始安装',
                            func:function(item,flag){
								download_confirm(item.data("id"));
							}
						},INSTALLED:{
                            name:'<i class="i-2">体验</i>点击体验',
                            func:function(item,flag){
                                var param = {ac: "download",gid:item.data("id"),t: _this['reg']['t'],r: Math.random()};
                                _this['client'].get(_this.ajaxPath,param,function(msg){
                                    if(msg['key']=='ok'){
                                        $(".user_mark").html(msg['mark']);
                                        _this['c']['mark'] = msg['mark'];
                                    }
                                    return false;
                                });
                            },
							click_func:function(data,item){
								if(!$.inArray(item.data("id"),play_gids)){
									play_gids.push( item.data("id"));
								}
								click_playgames_id.push(item.data("id"));

								AndroidDownload.callback_func.resume();

								window.android.bindEvent('resume', 'AndroidDownload.callback_func.resume');
								downloadApi_4399.launchApp(data['packageName']);
							}
						},UPDATABLE:{
							name:'<i class="i-3"></i>点击更新'
						}
					},{
						bind_init:function(games){
							if(_this['c']['login'] == 0 && _this['client']['scookie'] == ''){return false;}

							var param = {ac: "yesgame",games:games.join("|"),t: _this['reg']['t'],r: Math.random()};
							_this['client'].get(_this.ajaxPath,param,function(msg){
								if(msg['key']!='ok'){
									if( _this['c']['show_dialog']*1==1){return false;}
									_this.dialog = _this['tools'].alert(msg['msg']);
									return false;
								}
								$(".user_mark").html(msg['mark']);
								_this['c']['mark'] = msg['mark'];

								for(var i in msg['continuPlayDays']){
									$("#qiandao_days_num"+i).html(msg['continuPlayDays'][i]);
								}
								return false;
							});

							return true;
						},resume:function(){
							if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
							var param = {ac: "playgame",gids:click_playgames_id.join("|"),t: _this['reg']['t'],r: Math.random()};
							_this['client'].get(_this.ajaxPath,param,function(msg){
								if(msg['key']!='ok'){
									_this.dialog = _this['tools'].alert(msg['msg']);
									return false;
								}
								$(".user_mark").html(msg['mark']);
								_this['c']['mark'] = msg['mark'];

								for(var i in msg['play_stat']){
									if(msg['play_stat'][i]==1){
										$("#user_stat_"+i).addClass("get");
									}
								}

								for(var i in msg['continuPlayDays']){
									$("#qiandao_days_num"+i).html(msg['continuPlayDays'][i]);
								}
								
								return false;
							});
							return true;
						},error:function(games){
							//如果不支持下载，则进行第二步
							
							
							//有下载的游戏，进行请求试玩时间数据。如果有，则进行相应的操作。
							if(play_gids.length>0){
								
				
								var param = {ac: "yesgame",games:play_gids.join("|"),t: _this['reg']['t'],r: Math.random()};
								_this['client'].get(_this.ajaxPath,param,function(msg){
									if(msg['key']!='ok'){
										_this.dialog = _this['tools'].alert(msg['msg']);
										return false;
									}
									$(".user_mark").html(msg['mark']);
									_this['c']['mark'] = msg['mark'];

									for(var i in msg['play_stat']){
										if(msg['play_stat'][i]==1){
											$("#user_stat_"+i).addClass("get");
										}
									}
									
									return false;
								});

							}
							
							$(".j-download").click(function(){
								var _that = this;
								var item = $(_that);
								if(!tuc_javascript._checkLogin()){return false;}
								if( typeof window.android.isGameInstalled=='function' && window.android.isGameInstalled(item.data('packageName'))==1 ) {
									var param = {ac: "playgame",gids:item.data("id"),t: _this['reg']['t'],r: Math.random()};
									_this['client'].get(_this.ajaxPath,param,function(msg){
										if(msg['key']=='ok'){
											$(".user_mark").html(msg['mark']);
											_this['c']['mark'] = msg['mark'];
										}
										return false;
									});
								}
								window.android.onJsToGameDetails(item.data("id"));
								return false;
							});
							
							return true;
							
						},check:function(games){
							if(!tuc_javascript._checkLogin()){return false;}
							return true;
						},statusChange:function(item,k){
							if(item.data("status")==201){
								this.bind_init([item.data("id")]);
							}
						}
					}
				).init();

				var qiandao_reflash = false;
				$(".qiandao_days_lingqu_btn").click(function(){
					var _that = this;
					if(!_this._check(5)){return false;}
					
					
					var gid = $(this).data("gid");
					var days = $(this).data('days');
					// var qd_days = $(this).data("qddays");
					var qd_days = $("#qiandao_days_num"+gid).html()*1;
					// alert(gid);
					
					if($(_that).hasClass("a2")){
						return false;
					}
					
					if(qd_days<days){
						_this._alert("连续体验<i>"+days+"天</i>才能领取限时福利哦。<br/>当前还需连续体验<i>"+(days-qd_days)+"天</i>。");
						return false;
					}
					
					if(qiandao_reflash){return false;}
					qiandao_reflash = true;
					
					var param = {ac: "qiandao_days",gid:gid,t: _this['reg']['t'],r: Math.random()};
					_this['client'].get(_this.ajaxPath,param,function(msg){
						qiandao_reflash = false;

						if(msg['key']!='ok'){
							_this.dialog = _this['tools'].alert(msg['msg']);
							return false;
						}
						
						$(".user_mark").html(msg['mark']);
						_this['c']['mark'] = msg['mark'];
						$(_that).removeClass("a4").addClass("a2").html("已经领取");
						$(_that).siblings("p").html("");
						_this._alert("恭喜你成功领取<i>"+msg['xsfu_points']+"积分</i>");
						return false;
					});

					return false;
				});




			}else if(_this['platform']=="ios"){

				$(".show_bangfa").click(function(){
					var aid  = $(this).data('aid');
					if(aid==0){
						return true;
					}
					window.jumpToNewsDetail(aid,'1');
					return false
				});

				$(".ios-download1").click(function(){
					var mode = $(this).data("mode");
					var gid = $(this).data("gid");
					if(mode==1){
						return false;
					}
					window.ios.jumpToGameDetails(gid+"");
					return false;
				});
				$(".ios-download").click(function(){
					var _that = this;
					if(!_this._comm_check(5,false,true)){return false;}
					var gid = $(this).data("gid");
					var gamemode = $(this).data("gamemode");
					var idfa = onJsGetIDFA();
					var param = {ac: "iosyesgame",gid:gid,idfa:idfa,t: _this['reg']['t'],r: Math.random()};
					_this['client'].get(_this.ajaxPath,param,function(msg){
						if(_this['c']['ios_play_stat'][gid]*1!=-1){
							_show_dialog(_that,gamemode,gid);
							return false;
						}else{
							if(msg['key']!='ok'){
								_show_dialog(_that,gamemode,gid);
								return false;
							}
							_this['c']['ios_delay_time'][gid] = msg['delay_time'];
							_this._ios_gameSetTime(gid);
							
							_show_dialog(_that,gamemode,gid);
							return false;
						}
					});
					
					return false;
				});


				function _show_dialog(_that,gamemode,gid){
					if(gamemode==2){
						window.location.href = $(_that).attr("href");
						_this._dialog("dialog_package_load");
					}else if(gamemode==1){
						window.location.href = $(_that).attr("href");
					}else{
						window.ios.jumpToGameDetails(gid+"");
					}
				}

				//回答问题。
				
				$('.user_answer').click(function(){
					if(!_this._check(5)){return false;}
					if($(this).data('jobmode')!=0){
						return false;
					}
					
					var gid = $(this).data("gid");
					var iosid = $(this).data("iosid");

					//判断是否已经试玩。
					if(_this['c']['ios_play_stat'][gid]!=1){
						if($(this).data("gamemod")==2){
							_this._dialog("dialog_ios_none_play_dati");
						}else{
							_this._dialog("dialog_ios_none_play_dati");
						}
						return false;
					}

					//请求数据。
					var param = {ac: "iosquestion",gid:gid,t: _this['reg']['t'],r: Math.random()};
					_this['client'].get(_this.ajaxPath,param,function(msg){
						//如果已经得到正确答案。则返回。
						if(msg['key']=='yes_answer'){
							// _this._dialog("dialog_job_ok");
							return false;
						}

						if(msg['key']!='ok'){
							_this.dialog = _this['tools'].alert(msg['msg']);
							return false;
						}

						$("#dialog_question_game").data("gid",gid).attr("href",$("#user_download_"+gid).attr('href'));
						$("#dialog_question_submit").data("gid",gid);
						$("#dialog_question_submit").data("iosid",iosid);

						$("#dialog_question_title").html(msg['title']);
						$("#dialog_question_option").find("li").removeClass("on");
						$("#dialog_question_option").find("li").eq(0).html("A、<span>"+msg['option1']+"</span>");
						$("#dialog_question_option").find("li").eq(1).html("B、<span>"+msg['option2']+"</span>");
						$("#dialog_question_option").find("li").eq(2).html("C、<span>"+msg['option3']+"</span>");
						if(msg['option4']){
							$("#dialog_question_option").find("li").eq(3).html("D、<span>"+msg['option4']+"</span>");
						}else{
							$("#dialog_question_option").find("li").eq(3).hide();
						}
						_this._dialog("dialog_question");
						return false;
					});
					return false;
				});


				//选择选择事件。
				$("#dialog_question_option").find("li").click(function(){
					$("#dialog_question_option").find("li").removeClass("on");
					$(this).addClass("on");
				});


				//提交答案事件。
				$("#dialog_question_submit").click(function(){
					if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}

					//判断是否登录
					if(!_this._check(5)){return false;}
					var gid = $(this).data('gid')*1;
					var iosid = $(this).data("iosid");
					if(gid<0 || gid>999999999){
						_this.dialog = _this['tools'].alert("找不到这个APP。");
						return false;
					}



					var select_id = 0;
					$("#dialog_question_option").find("li").each(function(index){
						if($(this).hasClass("on")){
							select_id = index+1;
							return false;
						}
					});

					//判断是否已经选择答案。
					if(select_id==0){
						_this.dialog = _this['tools'].alert("你还没有选择答案哦！",function(){
							_this._dialog("dialog_question");
						});
						return false;
					}

					//请求数据。
					var param = {ac: "iosanswer",gid:gid,select_id:select_id,t: _this['reg']['t'],r: Math.random()};
					_this['client'].get(_this.ajaxPath,param,function(msg){

						//如果已经得到正确答案。则返回。
						if(msg['key']=='yes_answer'){
							// _this._dialog("dialog_job_ok");
							return false;
						}
						if(msg['key']!='ok'){
							_this.dialog = _this['tools'].alert(msg['msg']);
							return false;
						}

						if(msg['result']=="false"){
							//回答错误。
							$("#dialog_answer_false_stat").html(msg['stat']+"次");
							$("#dialog_answer_false_play").data("gid",gid).attr("href",$("#user_download_"+gid).attr('href'));
							if(_this['c']['question_stat'][gid]){
								_this['c']['question_stat'][gid]['stat'] = _this['c']['ios_answer_num']*1 - msg['stat']*1;
							}else{
								_this['c']['question_stat'][gid] = {
									'stat':_this['c']['ios_answer_num']*1 - msg['stat']*1,
									'ok':0
								}
							}
							_this.dialog = _this['tools'].dialog({id:"dialog_answer_false",close_id:".dialog_answer_false_close",close_fun:function(){
								if(msg['stat']>0){
									_this._dialog("dialog_question");
								}
							}});
							_this._ios_gameStatInit(gid);
						}else{
							//回答正确 。
							_this['c']['mark'] = msg['mark'];
							$(".user_mark").html(msg['mark']);
							$("#user_stat_"+gid+"_"+iosid).addClass("get");
							$(".user_answer_"+gid).removeClass("true").addClass("false").html("已答题");
							$("#dialog_answer_true_mark").html(msg['play_mark']);
							_this._dialog("dialog_answer_true");
						}
						return false;
					});

					return false;
				});


				//图片上传

				var user_img_param = {
					ac:"iosimgupload",
					size:0,
					data:'',
					t: _this['reg']['t'],
					r:Math.random()
				};

				$(".show_img").click(function(){
					if(!_this._comm_check(5)){return false;}
					onJsGallery({list:[$(this).data("img")]});
					return false;
				});

				$(".user_img").click(function(){
					var stat = $(this).data('stat');
					if(stat==3){
						_this.dialog = _this['tools'].alert("请加入<span>4399电脑专区签到交流群（群号：456878105）</span>，提醒小编发布新任务！");
						return false;
					}
					if(stat==4){
						// _this.dialog = _this['tools'].alert("当前任务时间已结束，请耐心等待新任务哦");
						return false;
					}

					if(stat==1 || stat==5){
						// _this._dialog("dialog_job_ok");
						return false;
					}



					if(!_this._check(5)){return false;}


					
					if($(this).data('jobmode')!=1){
						return false;
					}
					var gid = $(this).data("gid");
					var id = $(this).data("id");
					var iosid = $(this).data("iosid");
					var tixing = $(this).data('tixing');

					if($(this).data('step')==1 && stat!=5){
						//判断是否已经试玩。
						if(_this['c']['ios_play_stat'][gid]!=1){
							if($(this).data("gamemod")==2){
								_this._dialog("dialog_ios_none_play_img");
							}else{
								_this._dialog("dialog_ios_none_play_img");
							}
							return false;
						}
					}
					

					var param = {ac: "iosuserimgstat",gid:gid,iosid:iosid,t: _this['reg']['t'],r: Math.random()};
					_this['client'].get(_this.ajaxPath,param,function(msg){
						if(msg['key']!='ok'){
							_this.dialog = _this['tools'].alert(msg['msg']);
							return false;
						}

						user_img_param['gid'] = gid;
						user_img_param['iosid'] = iosid;

						$("#dialog_userimg_click").find("img").attr('src',function(){
							return $(this).data("defaultimg");
						});
						$("#dialog_userimg_tip").html("任务要求:"+$("#userimg_info_"+gid).html());
						$("#dialog_userimg_tixing").html(tixing);
						_this._dialog("dialog_userimg");
						
						return false;
					});
					return false;
				});


				var lr = new LocalResize($('#box')[0], {});
				lr.success(function(stop, data){
					stop(); // 停止加载状态
					if(data['original']['size']>1024*1024*3){
						if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
						_this.dialog = Tools.alert("图片超过3M，请重新上传~",function(){
							_this._dialog("dialog_userimg");
						});return false;
					}

					user_img_param['data'] = data.base64Clean;
					user_img_param['size'] = data['original']['size'];

					$('#dialog_userimg_click').find("img").attr("src",data.base64).addClass("load");     
				});

				$("#dialog_userimg_click").click(function(){
					$('#box').find("input").click();
					return false;
				});

				$("#dialog_userimg_btn").click(function(){
					if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
					if(!_this._check(5)){return false;}
					if(!user_img_param['gid']){
						if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
						_this.dialog = Tools.alert("对不起，还没有选择游戏哦。");
						return false;
					}

					if(user_img_param['size']<=0){
						_this.dialog = Tools.alert("你没有上传图片。",function(){
							_this._dialog("dialog_userimg");
						});
						return false;
					}

					if(!user_img_param['data']){
						_this.dialog = Tools.alert("你没有上传图片。",function(){
							_this._dialog("dialog_userimg");
						});
						return false;
					}

					_this._dialog("dialog_upload");

					_this['client'].get(_this.ajaxPath,user_img_param,function(msg){
						if(msg['key']!='ok'){
							_this._alert(msg['msg']);
							return false;
						}
						$("#user_stat_"+user_img_param['gid']+"_"+user_img_param['iosid']).attr("class","");
						$(".user_img_"+user_img_param['gid']).html("图片审核中");
						_this._dialog("dialog_success");
						return false;
					});
					return false;
				});
				


			}

		}else{
			$(".j-download,.ios-download").click(function(){
				_this._dialog("dialog_checkPlatform");
				return false;
			});
		}

	},
	commdialog:function(){

		var _this = this;
		$(".show_dialog").click(function(){
			_this._dialog($(this).data("dialog"));
			return false;
		});

	},
	bindweixin_init:function(){
		var _this = this;
		$(".copy_result_btn").each(function(index){
			var val_obj = $(".copy_result_val").eq(index);
			$(this).click(function(){
                var val = val_obj.val();
                if(!val){ return false;}
                _this._copyVal(val);
                return false;
			});
		});


		$("#bindWeixin_btn_prev").click(function(){
			$("#bindWeixin_btn_next").show();
			var pos = $("#bindWeixin_btn_page").data("num")*1-1;
			if(pos<=0){return false;}
			pos -= 1;
			if(pos==0){$(this).hide();}
			$("#bindWeixin_list").find("li").hide().eq(pos).show();
			$(".bindWeixin_info").hide().eq(pos).show();
			$("#bindWeixin_btn_page").html('<i>'+(pos+1)+'</i>/5').data("num",pos+1);
			return false;
		});
		
		$("#bindWeixin_btn_next").click(function(){
			$("#bindWeixin_btn_prev").show();
			var pos = $("#bindWeixin_btn_page").data("num")*1-1;
			if(pos>=4){return false;}
			pos += 1;
			if(pos==4){$(this).hide();}
			$("#bindWeixin_list").find("li").hide().eq(pos).show();
			$(".bindWeixin_info").hide().eq(pos).show();
			$("#bindWeixin_btn_page").html('<i>'+(pos+1)+'</i>/5').data("num",pos+1);
			return false;
		});

		$("#bindWeixin_video").click(function(){
			var href = $(this).attr("href");
			if(!href){return false;}
			if(typeof window.android.playVideo=='function'){
				window.android.playVideo("test",href);
			}else if(typeof window.onJsPlayVideo == 'function'){
				windo.onJsPlayVideo("test",href);
			}
			return false;
		});

	},
	_duihuang:function(){
		var _this = this;

		var checkDialog = null;

		_this['client'].ajax = function(url, data, callback) {
			if(this.env.isClient) {
				if(this.scookie=="" && window.login && window.login.onLoadCookieForJs) {
					this.scookie = unescape(window.login.onLoadCookieForJs());
				}
				data.scookie = this.scookie;
			}
			if(window.commentClientFunc && typeof window.commentClientFunc.onJsGetDeviceId == "function"){
				data.device = window.commentClientFunc.onJsGetDeviceId();
			}
	
			if(window.commentClientFunc && typeof window.commentClientFunc.getUniqueId == "function"){
				data.sdevice = window.commentClientFunc.getUniqueId();
			}

			$.ajax({
				url:url,
				type:"POST",
				data:data,
				async:false,
				success: function(result) {callback(result);},
				dataType:"json"
			});
		}
		
		function checkWeixinBind(info){
			var Flag = false;
			var param = {ac: "checkLingqu",type:info,t: _this['reg']['t'],r: Math.random()};
			_this['client'].ajax(_this.ajaxPath,param,function(msg){
				if(msg['key']!='ok'){
					if(msg['key']=='error'){
						_this._alert(msg['msg']);
					}else{
						$("#bindWeixin_btn_page").data("num",2);
						$("#bindWeixin_btn_prev").click();
						_this._dialog(msg['key']);
					}
					return false;
				}
				Flag = true;
				return true;
			});
			return Flag;
		}

		function checkIndentifyCode(info){

			if(_this['c']['check_code_stat']['error']*1>=_this['c']['indentifycode_num']*1){
				_this._alert('您今日未通过验证，无法兑换签到卡。<br/>您可以先做任务积攒积分，明天再来兑换签到卡哦~');
				return false;
			}

			var prex_msg = "";
			if(_this.platform=='android'){
				prex_msg = "，也无法领取限时福利";
			}

			if(_this['c']['check_code_stat']['success']*1!=1){
				var type = 4;
				checkDialog = $.identifyCode({
					info:'<span>为了防止恶意刷签到卡，请按照提示输入验证码完成验证</span><br/>验证通过后即可兑换各种签到卡，验证失败当天将不能兑换。',
					type:type,
					maxlength:type==3?6:4,
					randkey:"duihuang",
					reflash:1,
					checkFunc:function(val,key){

						if(!val){
							_this.dialog = _this['tools'].alert('你还没有输入验证信息哦！<br/><span style="color:red">每人每天仅有'+_this['c']['indentifycode_num']+'次验证机会，'+_this['c']['indentifycode_num']+'次均验证失败则当天无法兑换各种签到卡。</span><br/>请根据图片要求输入正确的验证信息。',function(){
								checkIndentifyCode(info);
							});
							return false;
						}

						var param = {ac: "checkindentify","codekey":key,"code":val,t: _this['reg']['t'],r: Math.random()};
						_this['client'].get(_this.ajaxPath,param,function(msg){
							if(msg['key']!='ok'){
								_this._alert(msg['msg']);
								return false;
							}
							_this['c']['check_code_stat'] = msg['check_code_stat'];
							if(msg['flag']*1==0){
								if(msg['error_stat']==0){
									_this._alert('您今日未通过验证，无法兑换签到卡。<br/>您可以先做任务积攒积分，明天再来兑换签到卡哦~');
								}else{
									_this.dialog = _this['tools'].alert('验证失败！<span style="color:red">每人每天仅有'+_this['c']['indentifycode_num']+'次验证机会，你还有'+msg['error_stat']+'次机会</span>，'+_this['c']['indentifycode_num']+'次均验证失败则当天无法兑换所有签到卡，请认真填写验证码。',function(){
										checkIndentifyCode(info);
									});
								}
								return false;
							}
							_this._alert('恭喜您验证通过，快去使用积分兑换各种签到卡吧！');
							return false;
						},"json");
						return false;
					}
				});
				return false;
			}

			return true;
		}

		var show_Daojishi_index = 4;
		var show_Daojishi_time = null;
		function show_Daojishi(){
			var msg = "下一次兑换需要间隔<span id='show_checkLingqu_time_span'>"+show_Daojishi_index+"</span>秒，请稍后再来兑换哦！";
			_this._alert(msg);
			
			function _sss(){
				if(show_Daojishi_index<=0){_this.dialog.close(); return false;}
				show_Daojishi_index--;
				$("#show_checkLingqu_time_span").html(show_Daojishi_index);
				show_Daojishi_time = window.setTimeout(_sss,1000);
			}
			show_Daojishi_time = window.setTimeout(_sss,1000);
			return false;
        }
        
        //领取完后的处理事项
        function _lingquEmptyError(card_name){
            if($(this).data("wxbind")*1==4){
                $("#dialog_weixin_msg_info").html("今日"+card_name+"已经被抢光啦！<br/>小编<i>每天早上"+_this['c']['buchang_time']+"点</i>准时补仓，并且还会不定时补仓。<br/>请保持对本活动的关注，以免错过兑换时间。<br/>为了更好地维护大家的利益，公平兑换"+card_name+"，<i>兑换前需先绑定QQ号</i>");
                _this._dialog("dialog_weixin_msg");
            }else if($(this).data("wxbind")*1==1){
                $("#dialog_weixin_msg_info").html("今日"+card_name+"已经被抢光啦！<br/>小编<i>每天早上"+_this['c']['buchang_time']+"点</i>准时补仓，并且还会不定时补仓。<br/>请保持对本活动的关注，以免错过兑换时间。<br/>为了更好地维护大家的利益，公平兑换"+card_name+"，<i>兑换前需先绑定4399小游戏微信公众号</i>，点击下方按钮可查看具体绑定教程哦~");
                _this._dialog("dialog_weixin_msg");
            }else{
                _this._alert("今日"+card_name+"已经被抢光啦！<br/>小编<i>每天早上"+_this['c']['buchang_time']+"点</i>准时补仓，并且还会不定时补仓。<br/>请保持对本活动的关注，以免错过兑换时间。");
            }
        }

		//补签卡兑换
		$(".user_supplementary_card_btn_confirm").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			if($(this).hasClass("no")){
                _lingquEmptyError.call(this,"补签卡");
				return false;
			}
			var sys_mark = $(this).data("mark");
            var deny_num = $(this).data("denynum");
            //判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('supplementary')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('supplementary')){return false;}
			}
			if(_this['c']['mark']*1 < sys_mark*1){
				_this._alert('积分不够，不能兑换哦！快去做任务得积分吧！');
				return false;
			}
			
			if(_this['c']['supplementary_card']*1>=deny_num*1){
				_this._dialog("dialog_enough_supplementary");
				return false;
			}
			

			_this._dialog("dialog_duihuang_supplementary_card");
			return false;
		});

		$(".user_supplementary_card_btn").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}

			if($(this).hasClass("no")){
                _lingquEmptyError.call(this,"补签卡");
				return false;
			}
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			if(_this['c']['supplementary_card']*1>=deny_num*1){
                _this._dialog("dialog_enough_supplementary");
				return false;
            }
            
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
                if(!checkWeixinBind('supplementary')){return false;}
			}else if($(this).data("wxbind")*1==2){
                if(!checkIndentifyCode('supplementary')){return false;}
            }
            
			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert("积分不够，不能兑换哦！快去做任务得积分吧！");
				return false;
			}

			if(_this.reflash){return false;}
			_this.reflash = true;
			var param = {ac: "supplementary",t: _this['reg']['t'],r: Math.random()};
			_this['client'].get(_this.ajaxPath,param,function(msg){
                _this.reflash = false;


				if(msg['key']=='enough_card'){
                    _this._dialog("dialog_enough_supplementary");
					return false;
				}
				
				if(show_Daojishi_time){
                    window.clearTimeout(show_Daojishi_time);
                }
				if(msg['key']=='show_checkLingqu_time'){
					show_Daojishi();
					return false;
				}else{
					show_Daojishi_index=4;
					show_Daojishi_time = null;
                }
				
				if(msg['key']!='ok'){
                    if(msg['key']=='error'){
                        _this._alert(msg['msg']);
					}else{
                        _this._dialog(msg['key']);
					}
					return false;
				}

				if(msg['stat']*1==0){
					$(".user_supplementary_card_btn_confirm").addClass("a2 no");
				}

				$(".user_mark").html(msg['mark']);
				_this['c']['mark'] = msg['mark'];

				$("#user_supplementary_card").html(msg['supplementary_card']);
				_this['c']['supplementary_card'] = msg['supplementary_card'];
				_this._dialog("dialog_duihuang_supplementary");
				return false;
			});
			return false;
		});



		//加速卡兑换。

		$(".user_accelerator_card_btn_confirm").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			
			if($(this).hasClass("no")){
                _lingquEmptyError.call(this,"加速卡");

				return false;
			}
			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			if(_this['c']['accelerator_card']*1>=deny_num*1){
				_this._dialog("dialog_enough_accelerator");
				return false;
			}
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('accelerator')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('accelerator')){return false;}
			}
			
			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert("积分不够，不能兑换哦！快去做任务得积分吧！");
				return false;
			}
			
			_this._dialog("dialog_duihuang_accelerator_card");
			return false;
		});

		$(".user_accelerator_card_btn").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			
			if($(this).hasClass("no")){
				_lingquEmptyError.call(this,"加速卡");
				return false;
			}
			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			if(_this['c']['accelerator_card']*1>=deny_num*1){
				_this._dialog("dialog_enough_accelerator");
				return false;
			}
			
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('accelerator')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('accelerator')){return false;}
			}

			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert("积分不够，不能兑换哦！快去做任务得积分吧！");
				return false;
			}

			if(_this.reflash){return false;}
			_this.reflash = true;
			
			var param = {ac: "accelerator",t: _this['reg']['t'],r: Math.random()};
			_this['client'].get(_this.ajaxPath,param,function(msg){
				_this.reflash = false;

				if(msg['key']=='enough_card'){
					_this._dialog("dialog_enough_accelerator");
					return false;
				}

				if(show_Daojishi_time){
					window.clearTimeout(show_Daojishi_time);
				}
				if(msg['key']=='show_checkLingqu_time'){
					show_Daojishi();
					return false;
				}else{
					show_Daojishi_index=4;
					show_Daojishi_time = null;
				}
				
				if(msg['key']!='ok'){
					if(msg['key']=='error'){
						_this._alert(msg['msg']);
					}else{
						_this._dialog(msg['key']);
					}
					return false;
				}

				if(msg['stat']*1==0){
					$(".user_accelerator_card_btn_confirm").addClass("a2 no");
				}


				$(".user_mark").html(msg['mark']);
				_this['c']['mark'] = msg['mark'];

				$("#user_accelerator_card").html(msg['accelerator_card']);
				_this['c']['accelerator_card'] = msg['accelerator_card'];
				_this._dialog("dialog_duihuang_accelerator");
				return false;
			});
			return false;
		});

		//荣耀卡兑换。
		$(".user_glory_card_btn_confirm").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			
			if($(this).data("open")!=1){
				_this._alert('荣耀卡是生死狙击签到活动的专属卡片，更多玩法即将开放，敬请期待！');
				return false;
			}

			if($(this).hasClass("no")){
				_lingquEmptyError.call(this,"荣耀卡");
				return false;
			}

			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			
			if(_this['c']['glory_card']*1>=deny_num*1){
				_this.dialog = _this['tools'].dialog({id: "",close_id: ".dialog_enough_glory_close"});
				_this._dialog('dialog_enough_glory');
				return false;
			}
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('glory')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('glory')){return false;}
			}
			
			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert('积分不够，不能兑换哦！快去做任务得积分吧！');
				return false;
			}
			_this._dialog("dialog_duihuang_glory_card");
			return false;
		});

		$(".user_glory_card_btn").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			
			if($(this).data("open")!=1){
				_this._alert('荣耀卡是生死狙击签到活动的专属卡片，更多玩法即将开放，敬请期待！');
				return false;
			}
			
			if($(this).hasClass("no")){
				_lingquEmptyError.call(this,"荣耀卡");
				return false;
			}

			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			
			if(_this['c']['glory_card']*1>=deny_num*1){
				_this.dialog = _this['tools'].dialog({id: "",close_id: ".dialog_enough_glory_close"});
				_this._dialog('dialog_enough_glory');
				return false;
			}
			
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('glory')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('glory')){return false;}
			}
			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert('积分不够，不能兑换哦！快去做任务得积分吧！');
				return false;
			}

			if(_this.reflash){return false;}
			_this.reflash = true;

			var param = {ac: "glory",t: _this['reg']['t'],r: Math.random()};
			_this['client'].get(_this.ajaxPath,param,function(msg){

				_this.reflash = false;
				
				if(msg['key']=='enough_card'){
					_this._dialog('dialog_enough_glory');
					return false;
				}
				
				if(show_Daojishi_time){
					window.clearTimeout(show_Daojishi_time);
				}
				if(msg['key']=='show_checkLingqu_time'){
					show_Daojishi();
					return false;
				}else{
					show_Daojishi_index=4;
					show_Daojishi_time = null;
				}
				
				if(msg['key']!='ok'){
					if(msg['key']=='error'){
						_this._alert(msg['msg']);
					}else{
						_this._dialog(msg['key']);
					}
					return false;
				}

				if(msg['stat']*1==0){
					$(".user_glory_card_btn_confirm").addClass("a2 no");
				}

				$(".user_mark").html(msg['mark']);
				_this['c']['mark'] = msg['mark'];


				$("#user_glory_card").html(msg['glory_card']);
				_this['c']['glory_card'] = msg['glory_card'];

				_this._dialog('dialog_duihuang_glory');
				return false;
			});
			return false;
		});


		//能量卡兑换。

		$(".user_strong_card_btn_confirm").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}

			if($(this).hasClass("no")){
				_lingquEmptyError.call(this,"能量卡");
				return false;
			}


			if($(this).data("open")!=1){
				_this._alert('能量卡即将上线，<i>使用能量卡可以获得更多额外奖励</i>，敬请期待！');
				return false;
			}
			
			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			
			if( _this['c']['strong_card']*1 >= deny_num*1){
				_this.dialog = _this['tools'].dialog({id: "dialog_enough_strong",close_id: ".dialog_enough_strong_close"});
				return false;
			}
			
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('strong')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('strong')){return false;}
			}
			if( _this['c']['mark']*1 < sys_mark*1){
				_this._alert('积分不够，不能兑换哦！快去做任务得积分吧！');
				return false;
			}
			_this._dialog("dialog_duihuang_strong_card");
			return false;
		});
		$(".user_strong_card_btn").click(function(){
			if(_this['dialog']){_this['dialog'].close();_this['dialog']=null;}
			if(!_this._check(5)){return false;}
			
			if($(this).hasClass("no")){
				_lingquEmptyError.call(this,"能量卡");
				return false;
			}

			if($(this).data("open")!=1){
				_this._alert('能量卡即将上线，<i>使用能量卡可以获得更多额外奖励</i>，敬请期待！');
				return false;
			}
			
			
			var sys_mark = $(this).data("mark");
			var deny_num = $(this).data("denynum");
			
			if(_this['c']['strong_card']*1>=deny_num*1){
				_this.dialog = _this['tools'].dialog({id: "dialog_enough_strong",close_id: ".dialog_enough_strong_close"});
				return false;
			}
			
			//判断是否绑定QQ或微信
			if($(this).data("wxbind")*1==1 || $(this).data("wxbind")*1==4){
				if(!checkWeixinBind('strong')){return false;}
			}else if($(this).data("wxbind")*1==2){
				if(!checkIndentifyCode('strong')){return false;}
			}

			if(_this['c']['mark']*1<sys_mark*1){
				_this._alert('积分不够，不能兑换哦！快去做任务得积分吧！');
				return false;
			}

			if(_this.reflash){return false;}
			_this.reflash = true;

			
			var param = {ac: "strong",t: _this['reg']['t'],r: Math.random()};
			_this['client'].get(_this.ajaxPath,param,function(msg){

				_this.reflash = false;
				
				if(msg['key']=='enough_card'){
					_this._dialog('dialog_enough_strong');
					return false;
				}
				
				if(show_Daojishi_time){
					window.clearTimeout(show_Daojishi_time);
				}
				if(msg['key']=='show_checkLingqu_time'){
					show_Daojishi();
					return false;
				}else{
					show_Daojishi_index=4;
					show_Daojishi_time = null;
				}
				
				if(msg['key']!='ok'){
					if(msg['key']=='error'){
						_this._alert(msg['msg']);
					}else{
						_this._dialog(msg['key']);
					}
					return false;
				}

				if(msg['stat']*1==0){
					$(".user_strong_card_btn_confirm").addClass("a2 no");
				}

				$(".user_mark").html(msg['mark']);
				_this['c']['mark'] = msg['mark'];

				$("#user_strong_card").html(msg['strong_card']);
				_this['c']['strong_card'] = msg['strong_card'];

				_this._dialog('dialog_duihuang_strong');
				return false;
			});
			return false;
		});


		$("#hd_gonggao").swipeSlide({
			speed:3000,
			axisX:false,
			touchFlag:false,
			continuousScroll:true
		});
		
	},_dialog:function(id){
		var _this = this;
		if(_this.dialog){_this.dialog.close();_this['dialog']=null;};
		_this.dialog = _this['tools'].dialog({id: id,close_id: "."+id+"_close"});
	},_alert:function(msg){
		var _this = this;
		if(_this.dialog){_this.dialog.close();_this['dialog']=null;};
		_this.dialog = Tools.alert(msg);
	},_copyVal:function(val){
		if("android" in window){
			if(typeof window.android.onCopyToClipboard == 'function'){
				window.android.onCopyToClipboard(val,"复制成功！");
			}
		}else if("onJsCopyToClipboard" in window){
			if(typeof window.onJsCopyToClipboard=="function"){
				window.onJsCopyToClipboard(val,"复制成功！");
			}
		}
		return false;
	},_qqbind:function(){
        window.android.onJSClickThridAuth(2);
        window.android.bindEvent('onThridPartLoginFinish', 'tuc_javascript._qqbind_callback');
        return false;
    },_qqbind_callback:function(status){
        var _this = tuc_javascript;
        
        if(status == 1){
            _this._alert('QQ授权绑定中，如在3秒后没有响应请重新点击绑定QQ！');
        }else if (status == -1){
            _this._alert('QQ授权绑定失败！可能的原因如下：<br/>1、该QQ已经绑定过其他4399账号；<br/>2、未授权成功就返回活动页面；<br/>3、授权时，需绑定的QQ未在手机上登录。');
            // _this._dialog("bindQQResult");
            return false;
        }else{
            _this._alert('准备授权中....');
            return false;
        }

        if(_this.reflash){return false;}
        _this.reflash = true;
        var param = {ac: "check_auth",t: _this['reg']['t'],r: Math.random()};
        _this['client'].get(_this.ajaxPath,param,function(msg){

            _this.reflash = false;
            
            if(msg['key']!='ok'){
                if(msg['key']=='error'){
                    _this._alert(msg['msg']);
                }else{
                    _this._dialog(msg['key']);
                }
                return false;
            }

            _this._alert("已成功授权绑定QQ，快去做任务兑换签卡吧！")
            return false;
        });
    }
}})()._();

window.onload = function () {
    alert("!")
}
