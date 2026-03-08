"use client"

import { CalorieLookupResponse } from "@/types"
import ResultCard from "../nutitionalValue/ResultCard"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer"

type DetailsDrawerProps = {
    food: CalorieLookupResponse,
    onClose: ()=>void
}

function DetailsDrawer({food, onClose}: DetailsDrawerProps) {
  return (
    <Drawer open onOpenChange={(open) => !open && onClose()}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="mb-4">Nutritional Values</DrawerTitle>
        <ResultCard food={food}/>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
  )
}

export default DetailsDrawer
