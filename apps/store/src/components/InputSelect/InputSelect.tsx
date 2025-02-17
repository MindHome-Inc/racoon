import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { ChangeEventHandler } from 'react'
import { ChevronIcon, InputBase, InputBaseProps, theme } from 'ui'
import { useHighlightAnimation } from '@/utils/useHighlightAnimation'

const Wrapper = styled(motion.div)({
  position: 'relative',
  backgroundColor: theme.colors.gray100,
  borderRadius: theme.radius.sm,
})

const StyledChevronIcon = styled(ChevronIcon)(() => ({
  position: 'absolute',
  top: '50%',
  right: '1.125rem',
  transform: 'translateY(-50%)',
}))

const StyledSelect = styled.select({
  color: theme.colors.textPrimary,
  fontSize: theme.fontSizes.xl,
  borderRadius: theme.radius.sm,
  width: '100%',
  padding: `${theme.space.xs} ${theme.space.xxl} ${theme.space.xs} ${theme.space.md}`,

  '&:hover': {
    cursor: 'pointer',
  },

  '&:focus-visible': {
    boxShadow: `0 0 0 1px ${theme.colors.textPrimary}`,
  },
})

const Placeholder = styled.option({
  color: theme.colors.textSecondary,
})

type InputSelectProps = InputBaseProps & {
  name: string
  options: ReadonlyArray<{ name: string; value: string }>
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  className?: string
}

export const InputSelect = ({
  options,
  name,
  onChange,
  value,
  defaultValue,
  placeholder,
  label,
  className,
  ...rest
}: InputSelectProps) => {
  const { highlight, animationProps } = useHighlightAnimation()

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event)
    highlight()
  }

  const labelText = label || placeholder

  return (
    <InputBase {...rest}>
      {() => (
        <Wrapper className={className} {...animationProps}>
          <StyledSelect
            name={name}
            onChange={handleChange}
            value={value}
            defaultValue={value ? undefined : defaultValue ?? ''}
            placeholder={placeholder}
            {...rest}
          >
            {labelText && (
              <Placeholder value="" disabled>
                {labelText}
              </Placeholder>
            )}
            {options.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </StyledSelect>

          <StyledChevronIcon size="1rem" />
        </Wrapper>
      )}
    </InputBase>
  )
}
