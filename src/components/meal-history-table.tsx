"use client"

import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { CalorieLookupResponse } from '@/types'
import { mealStore } from '@/stores/mealStore'
import DetailsDrawer from './common/details-drawer'
import { Button } from './ui/button'
import EmptyState from './common/empty-state'
import { authStore } from '@/stores/authStore'

const EMPTY: CalorieLookupResponse[] = []

function MealHistoryTable() {
  const userId = authStore((s) => s.user?.id)
  const data = mealStore((state) =>
    state.foods?.[userId ?? "guest"] ?? EMPTY
  )
  const [selectedFood, setSelectedFood] = useState<CalorieLookupResponse | null>(null)

  return (
    <div>
      {
        data?.length ? <>
         <Table containerClassName="max-h-96 overflow-y-auto">
          <TableCaption>Recent Searches</TableCaption>
          <TableHeader className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-muted/95 [&_th]:backdrop-blur">
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold">Dish name</TableHead>
              <TableHead className="font-bold">Servings</TableHead>
              <TableHead className="font-bold">Total calories</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data?.map(food => <TableRow key={food.foodId}>
                <TableCell>{food.dish_name}</TableCell>
                <TableCell>{food.servings}</TableCell>
                <TableCell>{food.total_calories}</TableCell>
                <TableCell><Button variant={"link"} className='hover:no-underline px-0' onClick={() => setSelectedFood(food)}>View Details</Button></TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
          {selectedFood && (
            <DetailsDrawer
              food={selectedFood}
              onClose={() => setSelectedFood(null)}
            />
          )}
          </> : <EmptyState title="It's empty here" subtitle={`Try Calories tab to get nutrional value data`}/>
      }

    </div>
  )
}

export default MealHistoryTable
