<?php

/**
 * 
 */
class Message
{
	function __construct($postObject)
	{
		$this->nombre = $postObject['nombre'] ;
		$this->email = $postObject['email'] ;
		$this->telefono = $postObject['telefono'] ;
		$this->origen = $postObject['origen'] ;
		if ($this->origen == 'contacto') {
			$this->empresa = $postObject['empresa'] ;
		}else{
			$this->area_de_interes = $postObject['area_de_interes'] ;
		}
		$this->comentario = $postObject['comentario'] ;
	}

	public function handle_post() {
		$this->save_message();
		$this->send_mail();
	}

	private function send_mail() {
		$to = 'hola@d2b.cl';
		if ($this->origen == 'contacto') {
			$subject = 'Mesnaje D2B Web - Contacto';
		} else {
			$subject = 'Mesnaje D2B Web - Trabaja Con Nosotros';
		}
		$mensaje = "Nombre: ". $this->nombre ."\r\n
					Email: ". $this->email ."\r\n
					Telefono: ". $this->telefono ."\r\n
					Empresa: ". $this->empresa ."\r\n
					Comentario: ". $this->comentario ."\r\n";

		return mail($to, $subject, $mensaje);
	}

	private function save_message() {
		$messageObject = [
			'nombre' => $this->nombre,
			'correo' => $this->email,
			'telefono' => $this->telefono,
			'origen' => $this->origen,
			'comentario' => $this->comentario
		];
		if ($this->origen == 'contacto') {
			$messageObject['empresa'] = $this->empresa;
		}else{
			$messageObject['empresa'] = $this->area_de_interes;
		}

		$url = 'https://admin.d2b.cl/d2badmin/items/mensajes';

		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/json\r\n",
		        'method'  => 'POST',
		        'content' => json_encode($messageObject)
		    )
		);

		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		return $result;
	}

}