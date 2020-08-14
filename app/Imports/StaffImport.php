<?php

namespace App\Imports;


use App\Exceptions\ImportStaffDataException;
use App\Staff;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class StaffImport implements ToModel, WithHeadingRow, WithBatchInserts
{
    private $staff;

    public function __construct()
    {
        $this->staff = new Staff();
    }

    /**
     * @param array $row
     * @return Staff|\Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Model[]|null
     * @throws ImportStaffDataException
     */
    public function model(array $row)
    {
        if (empty($row)) {
            return null;
        }

        //DATA VALIDATION
        $required_fields = ["first_name", "last_name", "email", "title", "status", "type"];
        foreach ($required_fields as $field) {
            if(empty($row[$field])) {
                throw new ImportStaffDataException("Bold headers required to fill on all rows. Required columns to fill: " . implode(", ", $required_fields));
            } else {
                $row[$field] = trim($row[$field]);
            }
        }

        if (!in_array($row["status"], Staff::STATUSES)) {
            throw new ImportStaffDataException("The file contains data in the \"status\" column that do not correspond to any existing in the application. Existing statuses: " . implode(", ", Staff::STATUSES));
        }

        if (!in_array($row["type"], Staff::TYPES)) {
            throw new ImportStaffDataException("The file contains data in the \"type\" column that do not correspond to any existing in the application. Existing types: " . implode(", ", Staff::TYPES));
        }

        //GET RELATIVE DATA
        $status = array_flip(Staff::STATUSES)[$row["status"]];
        $type = array_flip(Staff::TYPES)[$row["type"]];

        if(!empty($row["cell"]) && !is_numeric($row["cell"])) {
            throw new ImportStaffDataException("The file contains data in the \"cell\" column that is of the wrong type." );
        }

        $not_required_fields = ["cell", "home_phone", "home_street_number",
            "home_street_name", "home_city", "home_state", "home_zip", "image_url", "notes"];

        foreach ($not_required_fields as $field) {
            if(empty($row[$field])) {
                unset($row[$field]);
            } else {
                $row[$field] = trim($row[$field]);
            }
        }

        $row["status"] = $status;
        $row["type"] = $type;
        $row["user_status"] = Staff::CREATED;

        return new Staff($row);
    }

    /**
     * @return int
     */
    public function batchSize(): int
    {
        return 1000;
    }
}
