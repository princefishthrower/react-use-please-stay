/**
 * The validator function returns
 * - input number for number or strings that can be parsed to a number
 * - 0 for other
 *
 * @param {any} initialValue
 *              Value to be validated
 *
 * @return {number}
 *         input number or 0 for wrong input
 *
 * @example
 *        const validatedInitialValue = validateInitialValue(initialValue);
 */
export const validateInitialValue = (initialValue: any) => {
  if (typeof initialValue === 'string') {
    console.log(
      'you have passed a string to useCounter. It still may work however. Please pass a number.',
    );
    initialValue = parseInt(initialValue);
  }

  if (isNaN(initialValue)) {
    console.log(
      'you really want to break the useCounter. Please pass a number as parameter. Defaulting to zero.',
    );
    initialValue = 0;
  }
  return initialValue;
};
