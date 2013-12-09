<?php

class Contact extends Eloquent {
	protected $guarded = array();

	public static $rules = array();

	protected $fillable = ['first_name','last_name','email_address','description'];
}