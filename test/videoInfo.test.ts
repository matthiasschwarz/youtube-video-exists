/**
 * @jest-environment node
 * Issue: https://github.com/axios/axios/issues/1754#issuecomment-435784235
 */

import { getVideoInfo } from '../src'

describe('getVideoInfo', () => {
  it('should resolve with invalid id', async () => {
    await getVideoInfo('').then(value => {
      expect(value.validId).toBeFalsy()
      expect(value.existing).toBeFalsy()
      expect(value.private).toBeUndefined()
      expect(value.info).toBeUndefined()
    })

    await getVideoInfo('123456789abc').then(value => {
      expect(value.validId).toBeFalsy()
      expect(value.existing).toBeFalsy()
      expect(value.private).toBeUndefined()
      expect(value.info).toBeUndefined()
    })
  })

  it('should resolve with valid id', async () => {
    await getVideoInfo('00000000000').then(value => {
      expect(value.validId).toBeTruthy()
      expect(value.existing).toBeFalsy()
      expect(value.private).toBeUndefined()
      expect(value.info).toBeUndefined()
    })
  })

  it('should resolve with video info', async () => {
    await getVideoInfo('M7lc1UVf-VE').then(value => {
      expect(value.validId).toBeTruthy()
      expect(value.existing).toBeTruthy()
      expect(value.private).toBeFalsy()
      expect(value.info).toEqual({
        title: 'YouTube Developers Live: Embedded Web Player Customization',
        author: {
          name: 'Google Developers',
          url: 'https://www.youtube.com/user/GoogleDevelopers',
        },
      })
    })
  })

  it('should resolve as private video', async () => {
    await getVideoInfo('ZFxT6d13OKo').then(value => {
      expect(value.validId).toBeTruthy()
      expect(value.existing).toBeTruthy()
      expect(value.private).toBeTruthy()
      expect(value.info).toBeUndefined()
    })
  })
})

describe('getVideoInfo example existing check', () => {
  it('should run async', () => {
    getVideoInfo('M7lc1UVf-VE').then(value => {
      if (value.existing) console.log('Video exists!')
    })
  })

  it('should run blocked', async () => {
    const existing = (await getVideoInfo('M7lc1UVf-VE')).existing
    if (existing) console.log('Video exists!')
  })
})

describe('getVideoInfo example private check', () => {
  it('should run async', () => {
    getVideoInfo('ZFxT6d13OKo').then(value => {
      if (value.existing && value.private) console.log('Video is private!')
    })
  })

  it('should run blocked', async () => {
    const response = await getVideoInfo('ZFxT6d13OKo')
    if (response.existing && response.private) console.log('Video is private!')
  })
})
