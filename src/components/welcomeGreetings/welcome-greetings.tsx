'use client'
import { fetchGreetings, getRandomFoodFact } from '@/lib/utils';
import React from 'react'
import FadeInAnimation from '../common/fade-in-animation';
import { authStore } from '@/stores/authStore';

function WelcomeGreetings() {
  const greeting = fetchGreetings();
  const randomFact = getRandomFoodFact()
  const userInfo = authStore((state) => state.user)
  return (
    <>
    {
        userInfo &&  <FadeInAnimation>
        <div className='max-w-2xl mx-auto text-center py-10'>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {greeting}, {userInfo?.first_name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Did you know? {randomFact}
          </p>
        </div>
        </FadeInAnimation>
    }
       </>
  )
}

export default WelcomeGreetings