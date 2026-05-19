<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    /**
     * Run the migrations.
     */
    'up' => function (Builder $schema) {
        $schema->dropIfExists('post_edit_histories_archive');

        $schema->create('post_edit_histories_archive', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('post_id')->unsigned();
            $table->unsignedTinyInteger('archive_no')->unsigned()->default('1');
            // total revisions inside this archive (including revision 0 - the original content)
            $table->unsignedSmallInteger('revision_count')->unsigned()->default('1');
            $table->binary('contents')->nullable();
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade')->onUpdate('cascade');
        });

        $schema->table('post_edit_histories', function (Blueprint $table) {
            $table->foreign('archive_id')->references('id')->on('post_edit_histories_archive')->onUpdate('set null')->onDelete('set null');
        });

        // workaround for creating MEDIUMBLOB type using Schemas
        $connection = $schema->getConnection();
        $prefix = $connection->getTablePrefix();
        $connection->statement('ALTER TABLE '.$prefix.'post_edit_histories_archive MODIFY contents MEDIUMBLOB');
    },

    /**
     * Reverse the migrations.
     */
    'down' => function (Builder $schema) {
        $schema->dropIfExists('post_edit_histories_archive');
    },
];
