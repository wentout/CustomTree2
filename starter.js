$(function () {
	try {

		var count = 0;
		var info = function (str) {
			count++
			if (str !== undefined) {
				$('#debug').val($('#debug').val() + count + '. ' + str + '\n');
			} else {
				count = 0;
				$('#debug').html('');
			}
			$('#debug')[0].scrollTop = $('#debug')[0].scrollHeight;
		};
		info();

		var countRand = 0; // emulate network delays
		
		$('#tree_content').customTree({

			root : 'top',
			init : {
				callback : function (controller, tree) {
					info('Init callback.');
				}
			},

			// for leaf callbacks
			handlers : {
				added : function (leaf, controller, tree) {
					info('Added [' + controller.getPath(leaf) + '] \n   name :' + leaf.text);
				},
				loaded : function (leaf, controller, tree) {
					info('Loaded [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				parsed : function (leaf, controller, tree) {
					info('Parsed [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				open : function (leaf, controller, tree) {
					info('Open [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				close : function (leaf, controller, tree) {
					info('Close [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				hover : function (leaf, controller, tree) {
					// info('Hover [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				unhover : function (leaf, controller, tree) {
					// info('Unhover [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				focus : function (leaf, controller, tree) {
					info('Focus [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				beforeblur : function (callback, leaf, controller, tree) {
					info('Beforeblur [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
					callback && callback();
				},
				blur : function (leaf, controller, tree) {
					info('Blur [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				deleted : function (leaf, controller, tree) {
					info('Deleted [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				dblclick : function (leaf, controller, tree) {
					info('Dblclick [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				}
			},

			listeners : {
				// click, dblclick, contextmenu up the element Label
				contextmenu : function (leaf, controller, tree, event) {
					// debugger;
					info('Contextmenu [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				},
				dblclick : function (leaf, controller, tree, event) {
					// debugger;
					event.stopPropagation();
					info('Dblclick [' + controller.getPath(leaf) + '] \n   text :' + leaf.text);
				}
			},

			storeLoaded : false,
			// focusParentOnClose : true,
			// focusByDblClick: true,
			// blurFromContainerClick : false,
			// blurFromContainerDblClick : false,

			labelsBreak : {
				by : 50,
				expandOnHover : false,
				expandOnSelect : true
			},

			loader : function (path, callback) {
				var obj = {
					action : 'get',
					leaf : JSON.stringify(path)
				};
				try {
					$.ajax({
						type : "POST",
						async : true,
						data : obj,
						dataType : 'text',
						url : './tree.php',
						success : function (data) {
							if (data !== '') {
								try {
									var resp = JSON.parse(data);

								} catch (e) {
									$('#php_debug').html(data);
								}
								if (resp.success) {
									window.setTimeout(function () {
										callback(resp.data);
										countRand++;
										(countRand > 3) && (countRand = 0);
									}, countRand == 0 ? null : 700);
								}
							}
						},
						error : function (data) {
							alert(data);
						}
					});
				} catch (e) {
					info(e.stack || e);
				}

			}

		});

	} catch (e) {
		alert(e);
	}
}); //.hide().fadeIn( 1000 );
