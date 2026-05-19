<?php

namespace TheTurk\Diff\Console;

use Carbon\Carbon;
use Illuminate\Console\Command;
use TheTurk\Diff\Jobs\ArchiveDiffs;

class ArchiveCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'diff:archive';

    /**
     * @var string
     */
    protected $description =
        'If a post\'s revision count [x] is greater (or equal) than [A],
        first [y] can be stored as merged & compressed using this command.
        Specify related values from the settings modal.';

    public function handle()
    {
        /** @var ArchiveDiffs */
        $job = resolve(ArchiveDiffs::class);
        $time = Carbon::now();
        $this->info("Archive post's revisions {$time}");

        return $job->archiveAll();
    }
}
