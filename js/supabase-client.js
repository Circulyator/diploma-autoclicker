const SUPABASE_URL = 'https://wfxmegpooriotkrplsz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jzsje5DFfppFKSbmBJBBDQ_A_sO5rf7';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function saveToSupabase(state) {
    const { data, error } = await supabase
        .from('diploma_progress')
        .upsert({
            id: 1,
            state: state,
            updated_at: new Date().toISOString(),
        });
    
    if (error) {
        console.error('Error saving:', error);
        showNotification('❌ Ошибка сохранения');
        return false;
    }
    
    showNotification('💾 Прогресс сохранён!');
    return true;
}

async function loadFromSupabase() {
    const { data, error } = await supabase
        .from('diploma_progress')
        .select('state')
        .eq('id', 1)
        .single();
    
    if (error || !data) {
        console.log('No saved progress found');
        return null;
    }
    
    showNotification('📂 Прогресс загружен!');
    return data.state;
}