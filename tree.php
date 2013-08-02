<?php
	if( isset( $_POST['action'] ) ){ $action = $_POST['action']; }
	if( isset( $_POST['leaf'] ) ){ $leaf = json_decode($_POST['leaf']); }
	// echo var_dump($leaf);
	if( $action == 'get' ){
		$tf = false;
		$data = '';
		if( $leaf[0] == 'top' ){
			$tf = true;
			$data = array(
				'Parent1' => array(
					'folder' => true
				),
				'Parent2' => '{}',
				'Parent3' => array(
					'folder' => true
				),
				'Parent4' => '{}',
				'Parent5' => array(
					'folder' => true
				),
				'Parent6' => '{}',
				'Parent7' => '{}'
			);
			if( isset( $leaf[1] ) ){
				if( $leaf[1] == 'Parent1' ){
					$data = array(
						'Child1' => array(
							'folder' => true
						),
						'Child2' => array(
							'text' => 'Custom text for Child2'
						),
						'Child3' => '{}',
						'Child4' => array(
							'folder' => true
						),
						'Child5' => '{}',
						'Child6' => array(
							'folder' => true
						),
						'Child7' => '{}'
					);
				}
				if( $leaf[1] == 'Parent3' ){
					$data = array(
						'Child1' => array(
							'folder' => true
						),
						'Child2' => array(
							'text' => 'Custom text for Child3'
						),
						'Child3' => '{}',
						'Child4' => array(
							'folder' => true
						),
						'Child5' => '{}',
						'Child6' => array(
							'folder' => true
						),
						'Child7' => '{}'
					);
					if( isset( $leaf[2] ) ){
						if( $leaf[2] == 'Child4' ){
							$data = array(
								'Child1' => '{}',
								'Child2' => '{}',
								'Child3' => '{}'
							);
						}
					}
				}
			}
		}
		echo json_encode(array(
			'success' => $tf,
			'data' => $data
		));
	}
