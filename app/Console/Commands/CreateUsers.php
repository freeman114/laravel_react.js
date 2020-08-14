<?php

namespace App\Console\Commands;

use App\Actions\CreateUser;
use App\Staff;
use Illuminate\Console\Command;


class CreateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:users {company_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /** @var CreateUser  $createUser*/
    private $createUser;

    /**
     * Create a new command instance.
     *
     * @param CreateUser $createUser
     */
    public function __construct(CreateUser $createUser)
    {
        $this->createUser = $createUser;

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $company_id = $this->argument('company_id');

        Staff::where("status", Staff::CREATED)
            ->chunk(1000, function ($employees) use ($company_id){
                foreach ($employees as $employee) {
                    $this->createUser->forEmployee($employee, $company_id);
                }
            });
    }
}
