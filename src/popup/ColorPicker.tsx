/**
 * Color Picker Component
 *
 * Accessible color picker using react-colorful.
 * Stays within popup (no focus loss in Firefox).
 */

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import * as Popover from '@radix-ui/react-popover'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
  id: string
}

export function ColorPicker({ color, onChange, label, id }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='text-xs font-medium text-gray-600'>
        {label}
      </label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type='button'
            id={id}
            className='h-8 w-full cursor-pointer rounded border border-gray-300 transition-colors hover:border-gray-400'
            style={{ backgroundColor: color }}
            aria-label={`${label}: ${color}`}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side='bottom' align='start' sideOffset={4} className='z-50 rounded-lg border border-gray-200 bg-white p-3 shadow-lg'>
            <div className='space-y-2'>
              <HexColorPicker color={color} onChange={onChange} />
              <input
                type='text'
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className='w-full rounded border border-gray-300 px-2 py-1 text-center text-xs font-mono uppercase focus:border-green-500 focus:outline-none'
                placeholder='#000000'
              />
            </div>
            <Popover.Arrow className='fill-white' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
