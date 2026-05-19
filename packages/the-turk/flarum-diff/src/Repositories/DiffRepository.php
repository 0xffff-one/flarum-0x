<?php

namespace TheTurk\Diff\Repositories;

use TheTurk\Diff\Models\Diff;

class DiffRepository
{
    /**
     * Get a new query builder.
     *
     * @return Builder
     */
    public function query()
    {
        return Diff::query();
    }

    /**
     * Find revisions that match certain conditions.
     *
     * @param array    $where
     * @param array    $sort
     * @param int|null $limit
     * @param int      $offset
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findWhere(array $where = [], $sort = [], $limit = null, $offset = 0)
    {
        $query = $this->query()->where($where);

        foreach ((array) $sort as $field => $order) {
            $query->orderBy($field, $order);
        }

        return $query->skip($offset)->take($limit)->get();
    }
}
