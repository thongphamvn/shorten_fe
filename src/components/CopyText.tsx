import { CopyIcon } from '@chakra-ui/icons'
import { IconButton, useClipboard } from '@chakra-ui/react'

export default function CopyText({ text }: { text: string }) {
  const { onCopy, hasCopied } = useClipboard(text, { timeout: 500 })

  return (
    <IconButton
      ml={1}
      bg={hasCopied ? 'gray.100' : 'inherit'}
      onClick={onCopy}
      aria-label='Copy Icon'
      icon={<CopyIcon color={'gray.600'} />}
    ></IconButton>
  )
}
