import { X } from 'lucide-react'
import { FC, ReactNode, useEffect } from 'react'

import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  title?: string
  subtitle?: string
  children: ReactNode
  onClose: () => void
}
const Modal: FC<ModalProps> = ({
  open,
  title = '',
  subtitle = '',
  children,
  onClose,
}) => {
  useEffect(() => {
    const handleClose = (e) => {
      if (e.target.id === 'outside') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClose)

    return () => document.removeEventListener('mousedown', handleClose)
  }, [onClose])

  if (!open) return null

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg',
      )}
      id="outside"
    >
      <div className="bg-white dark:bg-[#252525] w-96 min-h-[200px] p-5 rounded-md shadow">
        <div className="flex items-end justify-end">
          <div className="flex items-center justify-between w-full">
            {title ? (
              <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
            ) : null}
            <span className="p-3 rounded-full cursor-pointer">
              <X
                className="w-5 h-5 text-zinc-900 font-semibold dark:text-white"
                onClick={() => onClose()}
              />
            </span>
          </div>
        </div>
        {subtitle ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}

export default Modal
