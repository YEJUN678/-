import { useEffect } from 'react'
import { useSiteConfig, DEFAULT_CONFIG } from './hooks/useSiteConfig'
import { useSites } from './hooks/useSites'
import { generateHTML } from './engine/templateEngine'
import { parseChat } from './engine/chatParser'
import ChatPanel from './components/ChatPanel'
import ControlPanel from './components/ControlPanel'
import PreviewPanel from './components/PreviewPanel'

export default function App() {
  const {
    config,
    update,
    replace,
    undo,
    redo,
    reset,
    applyDefaults,
    canUndo,
    canRedo,
  } = useSiteConfig()

  const {
    sites,
    currentId,
    currentSite,
    selectSite,
    createNewSite,
    duplicateSite,
    renameSite,
    deleteSite,
    updateSiteConfig,
    limit,
  } = useSites(DEFAULT_CONFIG)

  // Load config when switching sites
  useEffect(() => {
    if (currentSite?.config) replace(currentSite.config)
  }, [currentId])

  // Persist config changes into the current site
  useEffect(() => {
    if (currentId) updateSiteConfig(currentId, config)
  }, [config, currentId])

  const html = generateHTML(config)

  const handleChat = (message) => {
    const result = parseChat(message, config)
    if (result.reset) reset()
    if (result.applyDefaults) applyDefaults(config.template)
    if (result.replace) replace(result.replace)
    if (result.updates && Object.keys(result.updates).length) update(result.updates)
    return result.reply
  }

  return (
    <div className="app-shell">
      <ChatPanel config={config} onChat={handleChat} onAutoFill={() => applyDefaults(config.template)} />
      <ControlPanel
        config={config}
        onUpdate={update}
        onUndo={undo}
        onRedo={redo}
        onReset={reset}
        onApplyDefaults={() => applyDefaults(config.template)}
        onReplace={replace}
        canUndo={canUndo}
        canRedo={canRedo}
        sites={sites}
        currentSiteId={currentId}
        siteLimit={limit}
        onSelectSite={selectSite}
        onCreateSite={createNewSite}
        onDuplicateSite={duplicateSite}
        onRenameSite={renameSite}
        onDeleteSite={deleteSite}
      />
      <PreviewPanel html={html} siteId={currentId} siteName={currentSite?.name} />
    </div>
  )
}
