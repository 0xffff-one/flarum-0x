<?php

use Flarum\Database\Migration;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable(Passkey::table_name, function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('raw_id')->unique();
    $table->integer('user_id')->unsigned()->index();
    $table->text('passkey');
    $table->string('alias', 255)->nullable();
    $table->timestamp('created_at');
    $table->timestamp('last_seen_at')->nullable();
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
});
