[CmdletBinding()]
param(
  [string]$SourcePath = (Join-Path $PSScriptRoot '..\public\branding\zo-logo.png')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$taskPublicRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\public'))
$taskBrandingRoot = Join-Path $taskPublicRoot 'branding'
$taskArchivedLogo = Join-Path $taskBrandingRoot 'zo-logo.png'
$taskResolvedSource = (Resolve-Path -LiteralPath $SourcePath).ProviderPath
New-Item -ItemType Directory -Path $taskBrandingRoot -Force | Out-Null
if (-not $taskResolvedSource.Equals($taskArchivedLogo, [System.StringComparison]::OrdinalIgnoreCase)) {
  Copy-Item -LiteralPath $taskResolvedSource -Destination $taskArchivedLogo
}

function Convert-LogoToPng {
  param([System.Drawing.Image]$Logo, [int]$Size)

  $taskBitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $taskGraphics = [System.Drawing.Graphics]::FromImage($taskBitmap)
  $taskStream = New-Object System.IO.MemoryStream
  try {
    $taskGraphics.Clear([System.Drawing.Color]::White)
    $taskGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $taskGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $taskGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $taskScale = $Size / [Math]::Max($Logo.Width, $Logo.Height)
    $taskWidth = [single]($Logo.Width * $taskScale)
    $taskHeight = [single]($Logo.Height * $taskScale)
    $taskRectangle = New-Object System.Drawing.RectangleF(([single](($Size - $taskWidth) / 2)), ([single](($Size - $taskHeight) / 2)), $taskWidth, $taskHeight)
    $taskGraphics.DrawImage($Logo, $taskRectangle)
    $taskBitmap.Save($taskStream, [System.Drawing.Imaging.ImageFormat]::Png)
    return ,$taskStream.ToArray()
  } finally {
    $taskStream.Dispose()
    $taskGraphics.Dispose()
    $taskBitmap.Dispose()
  }
}

$taskLogo = [System.Drawing.Image]::FromFile($taskArchivedLogo)
try {
  $taskPngFiles = @{
    32 = 'favicon-32x32.png'
    180 = 'apple-touch-icon.png'
    192 = 'favicon-192x192.png'
  }
  $taskPngPayloads = @{}
  foreach ($taskSize in @(16, 32, 48, 180, 192)) {
    [byte[]]$taskPng = Convert-LogoToPng -Logo $taskLogo -Size $taskSize
    $taskPngPayloads[$taskSize] = $taskPng
    if ($taskPngFiles.ContainsKey($taskSize)) {
      [System.IO.File]::WriteAllBytes((Join-Path $taskPublicRoot $taskPngFiles[$taskSize]), $taskPng)
    }
  }

  # Standard ICO directory with exact PNG renditions at 16, 32 and 48 pixels.
  $taskIconSizes = @(16, 32, 48)
  $taskIconStream = New-Object System.IO.MemoryStream
  $taskIconWriter = New-Object System.IO.BinaryWriter($taskIconStream)
  try {
    $taskIconWriter.Write([uint16]0)
    $taskIconWriter.Write([uint16]1)
    $taskIconWriter.Write([uint16]$taskIconSizes.Length)
    $taskOffset = 6 + 16 * $taskIconSizes.Length
    foreach ($taskSize in $taskIconSizes) {
      [byte[]]$taskPng = $taskPngPayloads[$taskSize]
      $taskIconWriter.Write([byte]$taskSize)
      $taskIconWriter.Write([byte]$taskSize)
      $taskIconWriter.Write([byte]0)
      $taskIconWriter.Write([byte]0)
      $taskIconWriter.Write([uint16]1)
      $taskIconWriter.Write([uint16]32)
      $taskIconWriter.Write([uint32]$taskPng.Length)
      $taskIconWriter.Write([uint32]$taskOffset)
      $taskOffset += $taskPng.Length
    }
    foreach ($taskSize in $taskIconSizes) {
      $taskIconWriter.Write([byte[]]$taskPngPayloads[$taskSize])
    }
    $taskIconWriter.Flush()
    [System.IO.File]::WriteAllBytes((Join-Path $taskPublicRoot 'favicon.ico'), $taskIconStream.ToArray())
  } finally {
    $taskIconWriter.Dispose()
    $taskIconStream.Dispose()
  }
} finally {
  $taskLogo.Dispose()
}

Write-Output 'Generated favicon.ico (16/32/48), PNG favicons (32/192) and the 180px Apple touch icon from the original logo.'
